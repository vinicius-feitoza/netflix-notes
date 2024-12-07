document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.getElementById('saveButton');
  const annotationText = document.getElementById('annotationText');
  const messageDiv = document.getElementById('message');
  const myAnnotationsButton = document.getElementById('myAnnotationsButton');


  saveButton.addEventListener('click', function () {
    const annotation = annotationText.value.trim();

    messageDiv.textContent = '';
    messageDiv.className = '';

    chrome.storage.local.get(['jwtToken'], function (result) {
      if (!result.jwtToken) {
        // If not authenticated, redirect to login page
        window.location.href = 'login.html';
      }
    });

    if (!annotation) { 
      messageDiv.textContent = 'Please enter an annotation before saving.';
      messageDiv.classList.add('error');
      return;
    }
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        const activeTab = tabs[0];
        const url = activeTab.url;

        chrome.tabs.sendMessage(
          activeTab.id,
          { action: 'getTitleAndType' },
          function (response) {
            if (chrome.runtime.lastError) {
              console.error('Error:', chrome.runtime.lastError.message);
              messageDiv.textContent =
                'Error retrieving the title. Please try again.';
              messageDiv.classList.add('error');
              return;
            }

            if (response.error) {
              messageDiv.textContent = response.error;
              messageDiv.classList.add('error');
              return;
            }

            console.log('Received response:', response);
            const title = response.title;
            const type = response.type;
            const videoTime = response.time;
            const episodeInfo = response.episodeInfo;

            const annotationData = {
              text: annotation,
              title: title,
              playerTime: videoTime,
              videoType: type,
              episodeInfo: episodeInfo,
              url: url,
              timestamp: new Date().toISOString(),
            };

            chrome.storage.local.get(['jwtToken'], function (result) {

              const token = result.jwtToken;

              fetch('http://localhost:8080/annotations/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(annotationData)
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.text(); 
              })
              .then(data => {
                messageDiv.textContent = 'Annotation saved!';
                messageDiv.classList.add('success');
                annotationText.value = '';
          
                setTimeout(() => {
                  messageDiv.textContent = '';
                  messageDiv.className = '';
                }, 3000);
          
                console.log('Annotation Saved:', annotationData);
              })
              .catch(error => {
                messageDiv.textContent = 'Error saving annotation. Please try again.';
                messageDiv.classList.add('error');
          
                console.error('Error:', error);
              });
            });
          }
        );
      });
    })
    myAnnotationsButton.addEventListener('click', function () {
      window.location.href = 'annotations.html';
    });
  });
