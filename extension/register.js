document.addEventListener('DOMContentLoaded', function () {
    const registerButton = document.getElementById('registerButton');
    const backToLoginButton = document.getElementById('backToLoginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const messageDiv = document.getElementById('message');
      
    registerButton.addEventListener('click', function () {
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();
  
      messageDiv.textContent = '';
      messageDiv.className = '';
  
      if (!username || !password || !confirmPassword) {
        messageDiv.textContent = 'Please fill in all fields.';
        messageDiv.classList.add('error');
        return;
      }
  
      if (password !== confirmPassword) {
        messageDiv.textContent = 'Passwords do not match.';
        messageDiv.classList.add('error');
        return;
      }
  
      fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password, confirmPassword: confirmPassword }),
      })
      .then((response) => {
        const status = response.status;
        return response.text().then((text) => {
          return { status: status, text: text };
        });
      })
      .then(({ status, text }) => {
        if (status === 201) {
          messageDiv.textContent = 'Registration successful! Redirecting to login...';
          messageDiv.classList.add('success');
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          messageDiv.textContent = text.message || 'Registration failed.';
          messageDiv.classList.add('error');
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        messageDiv.textContent = 'Error during registration. Please try again.';
        messageDiv.classList.add('error');
      });
    });
    
    // Navigate back to the login page
    backToLoginButton.addEventListener('click', function () {
        window.location.href = 'login.html';
      });
  });
  