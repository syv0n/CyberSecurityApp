document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let questions = [];

    const commentTexts = {
        "0": "No Security and Privacy Awareness and Training program exists. (SAM 5320)",
        "1": "Security (0.5 points) and Privacy (0.5 points) Awareness and Training program in place. (SAM 5320)",
        "2": "Security and Privacy Awareness and Training program complies with requirements in SAM 5320.",
        "3": "Between 10.01% to 15% of phishing participants clicked link and/or provided credentials as determined by the Independent Security Assessment (ISA). (CMD ISA-PHII, Task: 10.8, NIST AT-2)",
        "4": "Less than 10% of phishing participants clicked link and provided credentials from the ISA. (CMD ISA-PHII, Task: 10.8, NIST AT-2)"
    };

    function loadQuestions() {
        fetch('http://localhost:9009/api/questions/ISO')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                questions = data;
                if (questions.length > 0) {
                    displayQuestions();
                } else {
                    alert('No questions available.');
                }
            })
            .catch(error => console.error('Error fetching questions:', error));
    }

    function displayQuestions() {
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = '';

        for (let i = 0; i < 2; i++) {
            const questionIndex = currentQuestionIndex + i;
            if (questionIndex >= questions.length) break;

            const question = questions[questionIndex];
            const questionDiv = document.createElement('div');
            questionDiv.innerHTML = `
                <h2>${question.question}</h2>
                <p>Category: ${question.category}</p>
                <p>Subcategory: ${question.subcategory}</p>
                <div>
                    <label>Score:</label>
                    <input type="text" id="score-${questionIndex}" placeholder="Score: 0 - 4" style="width: 20%;" title="0 - No progress\n1 - Initialized\n2 - Started\n3 - More than 50%\n4 - Completed">
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea id="comment-${questionIndex}" rows="4" style="width: 100%;"></textarea>
                </div>
            `;
            questionContainer.appendChild(questionDiv);

            const scoreInput = document.getElementById(`score-${questionIndex}`);
            const commentBox = document.getElementById(`comment-${questionIndex}`);

            scoreInput.addEventListener('input', () => {
                const selectedScore = scoreInput.value;
                if (commentTexts[selectedScore] !== undefined) {
                    commentBox.value = commentTexts[selectedScore];
                } else {
                    commentBox.value = '';
                }
            });
        }
    }

    function saveAnswer() {
        for (let i = 0; i < 2; i++) {
            const questionIndex = currentQuestionIndex + i;
            if (questionIndex >= questions.length) break;

            const score = document.getElementById(`score-${questionIndex}`).value;
            const comment = document.getElementById(`comment-${questionIndex}`).value;

            fetch('http://localhost:9009/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    questionId: questions[questionIndex].id,
                    score,
                    comment
                })
            }).then(response => response.json())
                .then(data => console.log(data.message))
                .catch(error => console.error('Error saving answer:', error));
        }

        if (currentQuestionIndex + 2 < questions.length) {
            currentQuestionIndex += 2;
            displayQuestions();
        } else {
            alert('Please submit your answers.');
        }
    }

    document.getElementById('save').addEventListener('click', saveAnswer);

    document.getElementById('prev').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex -= 3;
            displayQuestions();
        }
    });

    document.getElementById('submit').addEventListener('click', () => {
        alert('Assessment submitted successfully!');
        window.location.href = 'dashboard.html';
    });

    loadQuestions();
});
