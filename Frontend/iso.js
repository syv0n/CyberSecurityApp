let wheelPlot;
let currentQuestionIndex = 0;
let questions = [];
const originalColors = ["#1a69a4", "#e67300", "#248f23", "#b32121", "#7e5494", "#734c3f"];
const originalSizes = [1, 1, 1, 1, 1, 1];  // Original sizes for each component
let lastHighlightedIndices = [];

document.addEventListener('DOMContentLoaded', () => {
    const prod = window.location.hostname === 'localhost'
        ? 'http://localhost:9009'
        : 'http://162.240.40.136:9009';

    const commentTexts = {
        "0": "No Security and Privacy Awareness and Training program exists. (SAM 5320)",
        "1": "Security (0.5 points) and Privacy (0.5 points) Awareness and Training program in place. (SAM 5320)",
        "2": "Security and Privacy Awareness and Training program complies with requirements in SAM 5320.",
        "3": "Between 10.01% to 15% of phishing participants clicked link and/or provided credentials as determined by the Independent Security Assessment (ISA). (CMD ISA-PHII, Task: 10.8, NIST AT-2)",
        "4": "Less than 10% of phishing participants clicked link and provided credentials from the ISA. (CMD ISA-PHII, Task: 10.8, NIST AT-2)"
    };

    function createWheel() {
        var data = [{
            type: "sunburst",
            labels: [
                "NIST CSF 2.0",
                "Identify", "Protect", "Detect", "Respond", "Recover",
                "Asset Management", "Business Environment", "Governance", "Risk Assessment", "Risk Management Strategy", "Supply Chain Risk Management",
                "Identity Management", "Awareness and Training", "Data Security", "Information Protection", "Maintenance", "Protective Technology",
                "Anomalies and Events", "Security Continuous Monitoring", "Detection Processes",
                "Response Planning", "Communications", "Analysis", "Mitigation", "Improvements",
                "Recovery Planning", "Recovery Improvements", "Recovery Communications"
            ],
            parents: [
                "",
                "NIST CSF 2.0", "NIST CSF 2.0", "NIST CSF 2.0", "NIST CSF 2.0", "NIST CSF 2.0",
                "Identify", "Identify", "Identify", "Identify", "Identify", "Identify",
                "Protect", "Protect", "Protect", "Protect", "Protect", "Protect",
                "Detect", "Detect", "Detect",
                "Respond", "Respond", "Respond", "Respond", "Respond",
                "Recover", "Recover", "Recover"
            ],
            outsidetextfont: {size: 16, color: "#0d0000"},
            insidetextfont: {size: 14, color: "#0d0000"},
            leaf: {opacity: 1},
            marker: {
                line: {width: 2, color: "#ffffff"},
                colors: originalColors
            },
            branchvalues: 'total',
            textposition: 'inside',
            insidetextorientation: 'radial'
        }];

        var layout = {
            margin: {l: 0, r: 0, b: 0, t: 0},
            sunburstcolorway: originalColors,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
        };

        var config = {
            responsive: true
        };

        Plotly.newPlot('wheel-container', data, layout, config).then((plot) => {
            wheelPlot = plot;
            // Animate the wheel and show questions after a delay
            setTimeout(function() {
                document.getElementById('wheel-container').style.left = '20%';
                document.getElementById('question-wrapper').style.right = '0';
            }, 1000);
        });
    }

    function highlightWheelComponents(component, category) {
        if (!wheelPlot) {
            console.error('Wheel plot not initialized');
            return;
        }

        const data = wheelPlot.data[0];
        const newColors = [...originalColors];
        const newSizes = [...originalSizes];
        const componentIndex = data.labels.findIndex(label => label.toLowerCase() === component.toLowerCase());
        const categoryIndex = data.labels.findIndex(label => label.toLowerCase() === category.toLowerCase());

        // Reset previously highlighted components
        lastHighlightedIndices.forEach(index => {
            newColors[index] = originalColors[index];
            newSizes[index] = originalSizes[index];
        });

        lastHighlightedIndices = [];

        // Highlight new components
        if (componentIndex !== -1) {
            newColors[componentIndex] = 'rgba(255, 255, 0, 0.7)';
            newSizes[componentIndex] = 1.2;
            lastHighlightedIndices.push(componentIndex);
        }
        if (categoryIndex !== -1) {
            newColors[categoryIndex] = 'rgba(255, 165, 0, 0.7)';
            newSizes[categoryIndex] = 1.2;
            lastHighlightedIndices.push(categoryIndex);
        }

        Plotly.restyle(wheelPlot, {
            'marker.colors': [newColors],
            'transforms[0].value': newSizes,
            'transforms[0].type': 'mult'
        });
    }

    function loadQuestions() {
        fetch(`${prod}/api/questions/ISO`)
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
        const questionContent = document.getElementById('question-content');
        const question = questions[currentQuestionIndex];

        questionContent.innerHTML = `
            <h2>${question.id} . ${question.question}</h2>
            <p>Component: ${question.component}</p>
            <p>Category: ${question.category}</p>
            <p>Subcategory: ${question.subcategory}</p>
            <div>
                <label>Score:</label>
                <select id="score">
                    <option value=""> Please select the score </option>
                    <option value="0">0 - Have no policy or practice</option>
                    <option value="1">1 - Have a policy</option>
                    <option value="2">2 - Have a procedure/practice</option>
                    <option value="3">3 - Level-1 of effectiveness</option>
                    <option value="4">4 - Level-2 of effectiveness (HIGH)</option>
                </select>
            </div>
            <div>
                <label>Comment:</label>
                <textarea id="comment" rows="4" style="width: 100%;"></textarea>
            </div>
        `;

        updateNavigationButtons();
        highlightWheelComponents(question.component, question.category);

        const scoreDropdown = document.getElementById('score');
        const commentBox = document.getElementById('comment');

        scoreDropdown.addEventListener('change', () => {
            const selectedScore = scoreDropdown.value;
            commentBox.value = commentTexts[selectedScore];
            console.log('Score selected:', selectedScore, 'Comment:', commentTexts[selectedScore]);
        });
    }

    function updateNavigationButtons() {
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        prevButton.style.display = currentQuestionIndex > 0 ? 'inline-flex' : 'none';

        if (currentQuestionIndex === questions.length - 1) {
            nextButton.innerHTML = '<span class="material-icons">save</span>Save';
        } else {
            nextButton.innerHTML = 'Next<span class="material-icons">navigate_next</span>';
        }
    }

    function saveAnswer() {
        const score = document.getElementById('score').value;
        const comment = document.getElementById('comment').value;
        const question = questions[currentQuestionIndex];
        if (!question.id || !question.category || !question.subcategory || score === undefined) {
            console.error('Missing required data:', { question, score, comment });
            alert('Please fill in all required fields before saving.');
            return Promise.reject('Missing data');
        }

        return fetch(`${prod}/api/scores/save_scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                questionId: question.id,
                category: question.category,
                subcategory: question.subcategory,
                component: question.component,
                score,
                comment
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }

    document.getElementById('prev').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        saveAnswer().then(() => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            } else {
                alert('Assessment saved successfully!');
                window.location.href = 'display_scores.html';
            }
        }).catch(error => {
            console.error('Error saving answer:', error);
            alert('Error saving answer. Please try again.');
        });
    });

    createWheel();
    loadQuestions();
});