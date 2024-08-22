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
        fetch('http://localhost:9009/api/questions/CIO')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                questions = data;
                if (questions.length > 0) {
                    displayQuestion();
                } else {
                    alert('No questions available.');
                }
            })
            .catch(error => console.error('Error fetching questions:', error));
    }

    function displayQuestion() {
        const questionContainer = document.getElementById('question-container');
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <h2>${question.question}</h2>
            <p>Category: ${question.category}</p>
            <p>Subcategory: ${question.subcategory}</p>
            <div>
                <label>Score:</label>
                <select id="score">
                    <option value="0" title="No progress">0 - No progress</option>
                    <option value="1" title="Initialized">1 - Initialized</option>
                    <option value="2" title="Started">2 - Started</option>
                    <option value="3" title="More than 50%">3 - More than 50%</option>
                    <option value="4" title="Completed">4 - Completed</option>
                </select>
            </div>
            <div>
                <label>Comment:</label>
                <textarea id="comment" rows="4" style="width: 100%;"></textarea>
            </div>
        `;

        const scoreDropdown = document.getElementById('score');
        const commentBox = document.getElementById('comment');

        scoreDropdown.addEventListener('change', () => {
            const selectedScore = scoreDropdown.value;
            commentBox.value = commentTexts[selectedScore];
        });
    }

    function saveAnswer() {
        const score = document.getElementById('score').value;
        const comment = document.getElementById('comment').value;
        fetch('http://localhost:9009/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                questionId: questions[currentQuestionIndex].id,
                score,
                comment
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data.message);
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion();
                } else {
                    alert('Please submit your answers.');
                }
            })
            .catch(error => console.error('Error saving answer:', error));
    }

    document.getElementById('save').addEventListener('click', saveAnswer);

    document.getElementById('prev').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });

    document.getElementById('submit').addEventListener('click', () => {
        alert('Assessment submitted successfully!');
        window.location.href = 'dashboard.html';
    });

    loadQuestions();
});