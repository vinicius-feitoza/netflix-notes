document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const createAccountButton = document.getElementById('createAccountButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');
  
    loginButton.addEventListener('click', function () {
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      messageDiv.textContent = '';
      messageDiv.className = '';
  
      if (!username || !password) {
        messageDiv.textContent = 'Please enter both username and password.';
        messageDiv.classList.add('error');
        return;
      }
  
      fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token != null) {
            // Store the JWT token
            chrome.storage.local.set({ jwtToken: data.token }, function () {
              window.location.href = 'popup.html';
            });
          } else {
            messageDiv.textContent = data.message || 'Login failed.';
            messageDiv.classList.add('error');
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
          messageDiv.textContent = 'Error during login. Please try again.';
          messageDiv.classList.add('error');
        });
    });
  
    // Navigate to the register page
    createAccountButton.addEventListener('click', function () {
      window.location.href = 'register.html';
    });
  });
  