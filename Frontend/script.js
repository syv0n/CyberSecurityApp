document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    message.textContent = 'Registration successful!';
                    message.className = 'success';
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    message.textContent = data.message || 'Registration failed.';
                    message.className = 'error';
                }
            } catch (error) {
                console.error('Error:', error);
                message.textContent = 'An error occurred. Please try again.';
                message.className = 'error';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    message.textContent = 'Login successful!';
                    message.className = 'success';
                    localStorage.setItem('token', data.token);
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 2000);
                } else {
                    message.textContent = data.message || 'Login failed.';
                    message.className = 'error';
                }
            } catch (error) {
                console.error('Error:', error);
                message.textContent = 'An error occurred. Please try again.';
                message.className = 'error';
            }
        });
    }

    // New code for the NIST wheel page
    const nextPageBtn = document.getElementById('nextPageBtn');
    if (nextPageBtn) {
        
        nextPageBtn.addEventListener('click', function() {
            console.log('Button clicked');
            window.location.href = 'form.html';
        });
    }

    // New code for the input form page
    const nistForm = document.getElementById('nistForm');
    if (nistForm) {
        nistForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                identify: document.getElementById('identify').value,
                protect: document.getElementById('protect').value,
                detect: document.getElementById('detect').value,
                respond: document.getElementById('respond').value,
                recover: document.getElementById('recover').value,
                additional: document.getElementById('additional').value
            };

            try {

                const response = await fetch('http://localhost:3000/api/users/response', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Form submitted successfully!');
                    nistForm.reset();
                } else {
                    const errorData = await response.json();
                    alert('Form submission failed: ' + (errorData.message || 'Please try again.'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});