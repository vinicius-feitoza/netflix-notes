console.log('Netflix Notes Extension: Content script injected');

let currentTitle = '';
let currentType = '';
let currentTime = '';
let lastURL = window.location.href;
let observer = null;


function extractTitle() {
  const titleElement = document.querySelector("div[data-uia='video-title']");
  if (titleElement) {
    let showTitle = '';
    let episodeInfo = '';
    let contentType = '';

    const h4Element = titleElement.querySelector('h4');
    if (h4Element && h4Element.textContent.trim() !== '') {
      // TV show with a valid title
      contentType = 'TV Show';
      showTitle = h4Element.textContent.trim();
      episodeInfo = Array.from(titleElement.querySelectorAll('span'))
        .map((span) => span.textContent.trim())
        .join(' ');
    } else if (titleElement.textContent.trim() !== '') {
      // Mmovie with a valid title
      contentType = 'Movie';
      showTitle = titleElement.textContent.trim();
    } else {
      console.log('Title element found but content is empty');
      // Don't stop observing; content hasn't loaded yet
      return;
    }

    const newTitle = [showTitle, episodeInfo].filter(Boolean).join(' - ');

    if ((currentTitle !== newTitle || currentType !== contentType) && newTitle !== '') {
      currentTitle = newTitle;
      currentType = contentType;
      console.log('Current Title:', currentTitle);
      console.log('Content Type:', currentType);

      // Stop observing only after successfully capturing the title
      stopObserving();
    } else {
      console.log('Title not fully loaded yet or unchanged, continue observing');
    }
  } else {
    console.log('Title element not found');
  }
}


function startObserving() {
  if (observer !== null) {
    return;
  }

  observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (
        mutation.type === 'childList' ||
        mutation.type === 'characterData' ||
        mutation.type === 'attributes'
      ) {
        extractTitle();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    characterDataOldValue: true,
  });
}


function stopObserving() {
  if (observer !== null) {
    observer.disconnect();
    observer = null;
  }
}

function onURLChange() {
  console.log('URL change detected');
  currentTitle = '';
  currentType = '';
  stopObserving();
  startObserving();
}


function getTime() {
    const videoElement = document.querySelector('video');
    if (videoElement) {
        console.log('Video Element found, time:', videoElement.currentTime);
        currentTime = videoElement.currentTime;
    } else {
        console.log('Time element not found');
    }
}

setInterval(() => {
  if (window.location.href !== lastURL) {
    console.log('URL changed:', window.location.href);
    lastURL = window.location.href;
    onURLChange();
  }
}, 1000); // Check every 1000 milliseconds (1 second)

startObserving();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);
    if (request.action === 'getTitleAndType') {
      if (currentTitle && currentType) {
        getTime();
        sendResponse({ title: currentTitle, type: currentType, time: currentTime });
      } else {
        sendResponse({
          error:
            'Title and type not found. Please hover over the video player controls to display the title.',
        });
      }
    }
  });
  
