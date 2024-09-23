let wheelPlot;
let currentGroupIndex = 0;
let questionGroups = [];
const originalColors = ["#1a69a4", "#e67300", "#248f23", "#b32121", "#7e5494", "#734c3f"];
const originalSizes = [1, 1, 1, 1, 1, 1];
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
                questionGroups = groupQuestionsByComponent(data);
                if (questionGroups.length > 0) {
                    displayQuestionGroup();
                } else {
                    alert('No questions available.');
                }
            })
            .catch(error => console.error('Error fetching questions:', error));
    }

    function groupQuestionsByComponent(questions) {
        const groups = {};
        questions.forEach(question => {
            if (!groups[question.component]) {
                groups[question.component] = [];
            }
            groups[question.component].push(question);
        });
        return Object.values(groups);
    }

    function displayQuestionGroup() {
        const questionContent = document.getElementById('question-content');
        const group = questionGroups[currentGroupIndex];
        
        questionContent.innerHTML = `<h2>${group[0].component}</h2>`;
        
        group.forEach((question, index) => {
            const questionNumber = calculateQuestionNumber(currentGroupIndex, index);
            questionContent.innerHTML += `
                <div class="question">
                    <h3>${questionNumber}. ${question.question}</h3>
                    <p>Category: ${question.category}</p>
                    <p>Subcategory: ${question.subcategory}</p>
                    <div>
                        <label for="score-${index}">Score:</label>
                        <select id="score-${index}" class="score-select">
                            <option value=""> Please select the score </option>
                            <option value="0">0 - Have no policy or practice</option>
                            <option value="1">1 - Have a policy</option>
                            <option value="2">2 - Have a procedure/practice</option>
                            <option value="3">3 - Level-1 of effectiveness</option>
                            <option value="4">4 - Level-2 of effectiveness (HIGH)</option>
                        </select>
                    </div>
                    <div>
                        <label for="comment-${index}">Comment:</label>
                        <textarea id="comment-${index}" class="comment-area" rows="4" style="width: 100%;"></textarea>
                    </div>
                </div>
            `;
        });

        document.querySelectorAll('.score-select').forEach((select, index) => {
            select.addEventListener('change', () => updateComment(index));
        });

        updateNavigationButtons();
        highlightWheelComponents(group[0].component, group[0].category);
    }

    function calculateQuestionNumber(groupIndex, questionIndex) {
        let totalQuestions = 0;
        for (let i = 0; i < groupIndex; i++) {
            totalQuestions += questionGroups[i].length;
        }
        return totalQuestions + questionIndex + 1;
    }

    function updateComment(index) {
        const score = document.getElementById(`score-${index}`).value;
        const commentElement = document.getElementById(`comment-${index}`);
        commentElement.value = commentTexts[score] || '';
    }

    function updateNavigationButtons() {
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        prevButton.style.display = currentGroupIndex > 0 ? 'inline-flex' : 'none';

        if (currentGroupIndex === questionGroups.length - 1) {
            nextButton.innerHTML = '<span class="material-icons">save</span>Save';
        } else {
            nextButton.innerHTML = 'Next<span class="material-icons">navigate_next</span>';
        }
    }

    function saveAnswers() {
        const group = questionGroups[currentGroupIndex];
        const promises = group.map((question, index) => {
            const score = document.getElementById(`score-${index}`).value;
            const comment = document.getElementById(`comment-${index}`).value;
            
            if (!question.id || !question.category || !question.subcategory || score === "") {
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
        });

        return Promise.all(promises);
    }

    document.getElementById('prev').addEventListener('click', () => {
        if (currentGroupIndex > 0) {
            currentGroupIndex--;
            displayQuestionGroup();
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        saveAnswers().then(() => {
            if (currentGroupIndex < questionGroups.length - 1) {
                currentGroupIndex++;
                displayQuestionGroup();
            } else {
                alert('Assessment saved successfully!');
                window.location.href = 'display_scores.html';
            }
        }).catch(error => {
            console.error('Error saving answers:', error);
            alert('Error saving answers. Please ensure all fields are filled and try again.');
        });
    });

    createWheel();
    loadQuestions();
});