document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.getElementById('saveButton');
  const annotationText = document.getElementById('annotationText');
  const messageDiv = document.getElementById('message');

  saveButton.addEventListener('click', function () {
    const annotation = annotationText.value.trim();

    messageDiv.textContent = '';
    messageDiv.className = '';

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

            const annotationData = {
              annotation: annotation,
              url: url,
              title: title,
              type: type,
              time: videoTime,
              timestamp: new Date().toISOString(),
            };

            // TODO: send annotationData to backend api

            annotationText.value = '';

            messageDiv.textContent = 'Annotation saved!';
            messageDiv.classList.add('success');
            
            setTimeout(() => {
            messageDiv.textContent = '';
              messageDiv.className = '';
            }, 3000);

            console.log('Annotation Saved:', annotationData);
          }
        );
      }
    );
  });
});
