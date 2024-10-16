document.addEventListener('DOMContentLoaded', () => {
    const prod = window.location.hostname === 'localhost'
        ? 'http://localhost:9009'
        : 'http://162.240.40.136:9009';

    // Function to set error messages
    const setError = (element, message) => {
        const inputGroup = element.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');
        errorDisplay.innerText = message;
        element.classList.add('error');
    };

    // Function to set success messages
    const setSuccess = (element) => {
        const inputGroup = element.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');
        errorDisplay.innerText = '';
        element.classList.remove('error');
    };

    // Validation functions
    const validateUsername = () => {
        const usernameInput = document.getElementById('username');
        const usernameValue = usernameInput.value.trim();
        if (usernameValue.length < 5 || usernameValue.length > 30) {
            setError(usernameInput, 'Username must be between 5 and 30 characters');
        } else {
            setSuccess(usernameInput);
        }
    };

    const validateEmail = () => {
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            setError(emailInput, 'Invalid email address');
        } else {
            setSuccess(emailInput);
        }
    };

    const validatePassword = () => {
        const passwordInput = document.getElementById('password');
        const passwordValue = passwordInput.value.trim();
        if (passwordValue.length < 6) {
            setError(passwordInput, 'Password must be at least 6 characters long');
        } else {
            setSuccess(passwordInput);
        }
    };

    // Function to check password strength
    function isPasswordStrong(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    }

    // Event listeners for input validation
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (usernameInput) usernameInput.addEventListener('blur', validateUsername);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (passwordInput) passwordInput.addEventListener('blur', validatePassword);

    // Sign up form submission
    const signupForm = document.getElementById('signupForm');
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
                    setError(passwordInput, 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.');
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
                        alert('Registration successful!');
                        window.location.href = 'login.html';
                    } else {
                        alert(data.message || 'Registration failed.');
                    }
                } catch (error) {
                    alert('An error occurred. Please try again.');
                }
            }
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
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
                    alert('Login successful!');
                    localStorage.setItem('token', data.token);
                    window.location.href = 'Choose_Options.html';
                } else {
                    alert(data.message || 'Login failed.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Role selection buttons
    const roleButtons = {
        'cio-btn': 'cio',
        'iso-btn': 'iso',
        'tech-btn': 'tech'
    };

    Object.entries(roleButtons).forEach(([id, role]) => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', () => {
                localStorage.setItem('userRole', role);
                window.location.href = 'dashboard.html';
            });
        }
    });

    // Self-assessment button
    const selfAssessmentBtn = document.getElementById('self-assessment');
    if (selfAssessmentBtn) {
        selfAssessmentBtn.addEventListener('click', () => {
            const userRole = localStorage.getItem('userRole');
            const pages = {
                'cio': 'cio.html',
                'iso': 'iso.html',
                'tech': 'Tech.html'
            };
            if (pages[userRole]) {
                window.location.href = pages[userRole];
            } else {
                alert('Please select a role before proceeding to the assessment.');
                window.location.href = 'Choose_Options.html';
            }
        });
    }

    // NIST form submission
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

    // Save button functionality
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const category = document.getElementById('category').value;
            const subcategory = document.getElementById('subcategory').value;
            const score = document.getElementById('score').value;
            const comments = document.getElementById('comments').value;

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${prod}/api/scores/save_scores`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ category, subcategory, score, comments })
                });

                if (response.ok) {
                    alert('Score saved successfully!');
                } else {
                    const errorText = await response.text();
                    alert(`Failed to save score. Server response: ${errorText}`);
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Email verification function
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

    // Load a component's scores
    function loadComponent(component) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found. Please log in.');
            return;
        }
    
        fetch(`${prod}/api/simm/${component}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            renderComponentScores(component, data);
        })
        .catch(error => {
            console.error('Error loading component scores:', error);
        });
    }
    

    let scores = {};
    function updateScore(component, category, subcategory, value, index) {
        if (!scores[component]) {
            scores[component] = [];
        }
        scores[component][index] = {
            Category: category,
            Subcategory: subcategory,
            Score: parseFloat(value)
        };
    }


    // Render component scores
    function renderComponentScores(component, data) {
        console.log('Received data:', data);

        let scores;
        if (Array.isArray(data)) {
            scores = data;
        } else if (typeof data === 'object' && data !== null) {
            scores = Object.values(data);
        } else {
            console.error('Unexpected data format:', data);
            return;
        }

        let html = `<h2 class="text-2xl font-bold text-center">${component.toUpperCase()} Assessment</h2>`;
        html += `<table class="table-auto w-full mt-4"><thead><tr>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Foundational Objective</th>
                    <th>Maturity Level</th>
                    <th>Information Source</th>
                    <th>Score</th>
                 </tr></thead><tbody>`;

        scores.forEach((score, index) => {
            const category = score.Category || '';
            const subcategory = score.Subcategory || score.Subcatagory || '';
            const foundationalObjective = score.Foundational_Objective || score['OIS Foundational Objective'] || score.OIS_Foundational_Objective || '';
            const maturityLevel = score.Maturity_Level || score['Maturity Level'] || '';
            const informationSource = score.Information_Source || score['Information Source'] || '';

            html += `<tr>
                        <td>${category}</td>
                        <td>${subcategory}</td>
                        <td>${foundationalObjective}</td>
                        <td>${maturityLevel}</td>
                        <td>${informationSource}</td>
                        <td><input type="number" min="0" max="5" step="0.1" value="${score.Score || ''}" 
                            class="score-input" 
                            data-component="${component}"
                            data-category="${category}" 
                            data-subcategory="${subcategory}"
                            data-index="${index}"></td>
                    </tr>`;
        });

        html += `</tbody></table>
                 <button id="submit-scores-btn" class="bg-green-500 text-white py-2 px-4 rounded mt-4">Submit Scores</button>`;

        const assessmentContainer = document.getElementById('assessment-container');
        if (assessmentContainer) {
            assessmentContainer.innerHTML = html;
        } else {
            console.error('Assessment container not found');
        }

        // Add event listener for submit button
        const submitButton = document.getElementById('submit-scores-btn');
        if (submitButton) {
            submitButton.addEventListener('click', () => {
                submitComponentScores(component);
            });
        }

        // Add event listeners for score inputs
        const scoreInputs = document.querySelectorAll('.score-input');
        scoreInputs.forEach(input => {
            input.addEventListener('change', (event) => {
                const { component, category, subcategory, index } = event.target.dataset;
                updateScore(component, category, subcategory, event.target.value, index);
            });
        });
    }
    // Submit component scores
    function submitComponentScores(component) {
        const scoreInputs = document.querySelectorAll('.score-input');
        const scores = Array.from(scoreInputs).map(input => ({
            Category: input.dataset.category,
            Subcategory: input.dataset.subcategory,
            Score: input.value
        }));

        fetch(`${prod}/api/simm/${component}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ scores })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error submitting scores:', error);
            });
    }

    // Calculate and display the final score
    function calculateAndDisplayFinalScore() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found. Please log in.');
            return;
        }
    
        fetch(`${prod}/api/simm/calculate_final_score`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const finalScoreDisplay = document.getElementById('final-score-display');
            if (finalScoreDisplay) {
                finalScoreDisplay.innerHTML = `<h3 class="text-3xl font-bold">Final Assessment Score: ${data.assessmentScore}</h3>`;
            }
        })
        .catch(error => {
            console.error('Error calculating final score:', error);
        });
    }
    function fetchAndDisplayFinalScore() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found. Please log in.');
            return;
        }
    
        fetch(`${prod}/api/simm/assessment_score_history`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data); // For debugging
            const finalScoreDisplay = document.getElementById('final-score-display');
            if (finalScoreDisplay) {
                if (data.length > 0 && data[0].assessment_score) {
                    finalScoreDisplay.innerHTML = `<h3 class="text-3xl font-bold">Final Assessment Score: ${data[0].assessment_score}</h3>`;
                } else {
                    finalScoreDisplay.innerHTML = '<p class="text-xl">No final score available yet.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching final score:', error);
            const finalScoreDisplay = document.getElementById('final-score-display');
            if (finalScoreDisplay) {
                finalScoreDisplay.innerHTML = '<p class="text-xl text-red-500">Error fetching final score. Please try again later.</p>';
            }
        });
    }
    
    

    // Add event listeners for component buttons and final score button
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            const component = button.textContent.toLowerCase();
            loadComponent(component);
        });
    });

    // Add event listener for final score button
    const viewFinalScoreBtn = document.getElementById('view-final-score-btn');
    if (viewFinalScoreBtn) {
        viewFinalScoreBtn.addEventListener('click', fetchAndDisplayFinalScore);
    }

    // Add event listener for back to dashboard button
    const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
    if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }

});