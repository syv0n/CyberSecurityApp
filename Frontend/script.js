document.addEventListener('DOMContentLoaded', () => {

    const prod = window.location.hostname === 'localhost'
    ? 'http://localhost:9009'
    : 'http://162.240.40.136:9009'

    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');
    const nistForm = document.getElementById('nistForm');
    const saveButton = document.getElementById('saveButton');

    const ciobtn = document.getElementById('cio-btn');
    const techbtn = document.getElementById('tech-btn');
    const isobtn = document.getElementById('iso-btn');
    const selfAssessmentBtn = document.getElementById('self-assessment');
    
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const setError = (element, message) => {
        const inputGroup = element.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');
        errorDisplay.innerText = message;
        element.classList.add('error');
    };

    const setSuccess = (element) => {
        const inputGroup = element.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');
        errorDisplay.innerText = '';
        element.classList.remove('error');
    };

    const validateUsername = () => {
        const usernameValue = usernameInput.value.trim();
        if (usernameValue.length < 5 || usernameValue.length > 30) {
            setError(usernameInput, 'Username must be between 5 and 30 characters');
        } else {
            setSuccess(usernameInput);
        }
    };

    const validateEmail = () => {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            setError(emailInput, 'Invalid email address');
        } else {
            setSuccess(emailInput);
        }
    };

    const validatePassword = () => {
        const passwordValue = passwordInput.value.trim();
        if (passwordValue.length < 6) {
            setError(passwordInput, 'Password must be at least 6 characters long');
        } else {
            setSuccess(passwordInput);
        }
    };

    function isPasswordStrong(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    }

    if (usernameInput) usernameInput.addEventListener('blur', validateUsername);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (passwordInput) passwordInput.addEventListener('blur', validatePassword);

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            validateUsername();
            validateEmail();
            validatePassword();

            if (!usernameInput.classList.contains('error') && 
                !emailInput.classList.contains('error') && 
                !passwordInput.classList.contains('error')) {
                
                const username = usernameInput.value;
                const email = emailInput.value;
                const password = passwordInput.value;

                if (!isPasswordStrong(password)) {
                    message.textContent = 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.';
                    message.className = 'error';
                    return;
                }

                try {
                    const response = await fetch(`${prod}/api/users/register`, {
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
                    message.textContent = 'An error occurred. Please try again.';
                    message.className = 'error';
                }
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${prod}/api/users/login`, {
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
                        window.location.href = 'Choose_Options.html';
                    }, 2000);
                } else {
                    message.textContent = data.message || 'Login failed.';
                    message.className = 'error';
                }
            } catch (error) {

                message.textContent = 'An error occurred. Please try again.';
                message.className = 'error';
            }
        });
    }
    // Modify the role selection buttons
    if (ciobtn) {
        ciobtn.addEventListener('click', () => {
            localStorage.setItem('userRole', 'cio');
            window.location.href = 'dashboard.html';
        });
    }

    if (isobtn) {
        isobtn.addEventListener('click', () => {
            localStorage.setItem('userRole', 'iso');
            window.location.href = 'dashboard.html';
        });
    } 

    if (techbtn) {
        techbtn.addEventListener('click', () => {
            localStorage.setItem('userRole', 'tech');
            window.location.href = 'dashboard.html';
        });
    }

    
    
    if (selfAssessmentBtn) {
        selfAssessmentBtn.addEventListener('click', () => {
            const userRole = localStorage.getItem('userRole');
            switch(userRole) {
                case 'cio':
                    window.location.href = 'cio.html';
                    break;
                case 'iso':
                    window.location.href = 'iso.html';
                    break;
                case 'tech':
                    window.location.href = 'Tech.html';
                    break;
                default:
                    alert('Please select a role before proceeding to the assessment.');
                    window.location.href = 'Choose_Options.html';
            }
        });
    }
    

    if (nistForm) {
        nistForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                identify: document.getElementById('identify').value,
                protect: document.getElementById('protect').value,
                detect: document.getElementById('detect').value,
                respond: document.getElementById('respond').value,
                recover: document.getElementById('recover').value,
                comments: document.getElementById('comments').value
            };

            try {
                const response = await fetch(`${prod}/api/users/response`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
                alert('An error occurred. Please try again.');
            }
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const category = document.getElementById('category').value;
            const subcategory = document.getElementById('subcategory').value;
            const score = document.getElementById('score').value;
            const comments = document.getElementById('comments').value;

            try {
                const token = localStorage.getItem('token');
                const response = await fetch('${prod}/api/scores/save_scores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ category, subcategory, score, comments })
                });

                if (response.ok) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        const data = await response.json();
                        alert(data.message);
                    } else {
                        alert('Score saved successfully!');
                    }
                } else {
                    const errorText = await response.text();
                    alert(`Failed to save score. Server response: ${errorText}`);
                }
            } catch (error) {

                alert('An error occurred. Please try again.');
            }
        });
    }

    // Add this new function for email verification
function verifyEmail() {
    const messageElement = document.getElementById('message');
    const token = new URLSearchParams(window.location.search).get('token');
    
    if (token) {
        fetch(`${prod}/api/users/verify-email/${token}`)
            .then(response => response.json())
            .then(data => {
                messageElement.textContent = data.message;
                if (data.message.includes('successfully')) {
                    messageElement.className = 'success';
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 3000);
                } else {
                    messageElement.className = 'error';
                }
            })
            .catch(error => {
                messageElement.textContent = 'Error verifying email: ' + error.message;
                messageElement.className = 'error';
            });
    } else {
        messageElement.textContent = 'Invalid verification link';
        messageElement.className = 'error';
    }
}

// Call verifyEmail function if on the verify-email page
if (window.location.pathname.includes('verify-email')) {
    verifyEmail();
}  
});