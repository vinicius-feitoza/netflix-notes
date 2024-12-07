console.log("annotations.js loaded");

function fetchAnnotations() {
  chrome.storage.local.get(['jwtToken'], function(result) {
    const token = result.jwtToken;

    if (!token) {
      console.error('No token found. Redirecting to login.');
      window.location.href = 'login.html';
      return;
    }

    fetch('http://localhost:8080/annotations/grouped', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      displayAnnotations(data);
      attachCollapsibleLogic();
    })
    .catch(error => {
      console.error('Error fetching annotations:', error);
      if (error.message.includes('401')) {
        window.location.href = 'login.html';
      }
    });
  });
}

function displayAnnotations(shows) {
  const mainContainer = document.querySelector('main');
  mainContainer.innerHTML = ''; // Clear any previous content

  if (shows.length === 0) {
    const noAnnotationsMessage = document.createElement('p');
    noAnnotationsMessage.textContent = "You don't have any annotations yet.";
    noAnnotationsMessage.style.textAlign = "center";
    mainContainer.appendChild(noAnnotationsMessage);
    return;
  }

  shows.forEach(show => {
    const showGroup = document.createElement('div');
    showGroup.className = 'show-group';

    // Collapsible button
    const collapsibleButton = document.createElement('button');
    collapsibleButton.className = 'collapsible';
    collapsibleButton.textContent = show.title;

    // Content div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    contentDiv.style.display = 'none';

    // Add annotations
    show.annotations.forEach(annotation => {
      // If episodeInfo is not empty, add a paragraph for it
      if (annotation.episodeInfo && annotation.episodeInfo.trim() !== '') {
        const episodeInfoP = document.createElement('p');
        episodeInfoP.textContent = annotation.episodeInfo;
        contentDiv.appendChild(episodeInfoP);
      }

      const annotationDiv = document.createElement('div');
      annotationDiv.className = 'annotation';

      const playerTimeSpan = document.createElement('span');
      playerTimeSpan.className = 'player-time';
      playerTimeSpan.textContent = annotation.playerTime;

      const annotationText = document.createElement('p');
      annotationText.textContent = annotation.text;

      annotationDiv.appendChild(playerTimeSpan);
      annotationDiv.appendChild(annotationText);

      contentDiv.appendChild(annotationDiv);
    });

    showGroup.appendChild(collapsibleButton);
    showGroup.appendChild(contentDiv);
    mainContainer.appendChild(showGroup);
  });
}

function attachCollapsibleLogic() {
  const collapsibles = document.querySelectorAll(".show-group button.collapsible");

  collapsibles.forEach(button => {
    button.addEventListener("click", () => {
      const content = button.parentElement.querySelector(".content");
      if (content) {
        content.style.display = content.style.display === "block" ? "none" : "block";

        console.log("Toggled content for:", button.innerText, "Current state:", content.style.display);
      } else {
        console.error("Content not found for button:", button.innerText);
      }
    });
  });
}

fetchAnnotations();
