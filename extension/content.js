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
      if (h4Element) {
        contentType = 'TV Show';
        showTitle = h4Element.textContent.trim();
        episodeInfo = Array.from(titleElement.querySelectorAll('span'))
          .map((span) => span.textContent.trim())
          .join(' ');
      } else {
        contentType = 'Movie';
        showTitle = titleElement.textContent.trim();
      }
  
      const newTitle = [showTitle, episodeInfo].filter(Boolean).join(' - ');
  
      if (currentTitle !== newTitle || currentType !== contentType) {
        currentTitle = newTitle;
        currentType = contentType;
        console.log('Current Title:', currentTitle);
        console.log('Content Type:', currentType);
  
        stopObserving();
      }
    } else {
      console.log('Title element not found');
    }
  }  

function startObserving() {
  if (observer === null) {
    observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node;
            if (
              element.matches("div[data-uia='video-title']") ||
              element.querySelector("div[data-uia='video-title']")
            ) {
              extractTitle();
              break;
            }
          }
        }
      }
    });
  }

  observer.observe(document.body, { childList: true, subtree: true });
}

function stopObserving() {
  if (observer !== null) {
    observer.disconnect();
    observer = null;
  }
}

function onURLChange() {
  console.log('URL changed detected');
  currentTitle = '';
  currentType ='';
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
  
