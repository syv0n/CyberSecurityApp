let wheelPlot;
let currentQuestionIndex = 0;
let questions = [];
const originalColors = ["#1a69a4", "#e67300", "#248f23", "#b32121", "#7e5494", "#734c3f"];
const originalSizes = [1, 1, 1, 1, 1, 1];  // Original sizes for each component
let lastHighlightedIndex = -1;

const commentTexts = {
    "Q1": {
        "0": "No asset inventory exists. Critical assets supporting key functions are not identified or documented. (NIST ID.AM-1)",
        "1": "Basic asset inventory exists but is incomplete or outdated. Limited documentation of critical assets. (NIST ID.AM-1)",
        "2": "Asset inventory process is established. Most critical assets are identified and documented, but gaps remain. (NIST ID.AM-1)",
        "3": "Comprehensive asset inventory is in place. Critical assets are well-documented with regular updates. (NIST ID.AM-1, SAM 5305.4)",
        "4": "Robust asset management system implemented. All critical assets are thoroughly documented and continuously monitored. (NIST ID.AM-1, SAM 5305.4)"
    },
    "Q2": {
        "0": "No formal risk assessment process for cybersecurity risks exists. (NIST ID.RA-1)",
        "1": "Basic risk assessment process is defined but not consistently applied to cybersecurity risks. (NIST ID.RA-1)",
        "2": "Risk assessment process for cybersecurity is implemented but may not cover all operational areas. (NIST ID.RA-1)",
        "3": "Comprehensive risk assessment process is in place, covering most cybersecurity risks to operations. (NIST ID.RA-1, SAM 5305.7)",
        "4": "Advanced risk assessment framework implemented, addressing all cybersecurity risks with regular updates. (NIST ID.RA-1, SAM 5305.7)"
    },
    "Q3": {
        "0": "No identity management or access control systems in place. (NIST PR.AC-1)",
        "1": "Basic identity management exists, but access control is limited or inconsistent. (NIST PR.AC-1)",
        "2": "Identity management and access control systems are implemented but may have gaps in coverage or enforcement. (NIST PR.AC-1)",
        "3": "Comprehensive identity management and access control systems are in place and regularly maintained. (NIST PR.AC-1, SAM 5305.5)",
        "4": "Advanced, adaptive identity and access management systems are implemented with continuous monitoring and improvement. (NIST PR.AC-1, SAM 5305.5)"
    },
    "Q4": {
        "0": "No data security policies or procedures exist to protect information. (NIST PR.DS-1)",
        "1": "Basic data security policies exist but lack comprehensive coverage or implementation. (NIST PR.DS-1)",
        "2": "Data security policies and procedures are in place but may not fully address all aspects of confidentiality, integrity, and availability. (NIST PR.DS-1)",
        "3": "Comprehensive data security policies and procedures are implemented and followed. (NIST PR.DS-1, SAM 5305.8)",
        "4": "Advanced data security framework in place with regular audits and updates to ensure optimal protection. (NIST PR.DS-1, SAM 5305.8)"
    },
    "Q5": {
        "0": "No continuous security monitoring implemented to detect cybersecurity events. (NIST DE.CM-1)",
        "1": "Basic monitoring in place but lacks comprehensive coverage or real-time capabilities. (NIST DE.CM-1)",
        "2": "Security monitoring implemented but may have gaps in coverage or analysis capabilities. (NIST DE.CM-1)",
        "3": "Comprehensive continuous monitoring system in place covering most network areas and cybersecurity events. (NIST DE.CM-1, SAM 5305.6)",
        "4": "Advanced, AI-driven continuous monitoring system implemented with full coverage and real-time threat detection. (NIST DE.CM-1, SAM 5305.6)"
    },
    "Q6": {
        "0": "No defined incident response processes or procedures exist. (NIST RS.RP-1)",
        "1": "Basic incident response plan exists but lacks detail or has not been tested. (NIST RS.RP-1)",
        "2": "Incident response processes are defined but may not be comprehensive or regularly tested. (NIST RS.RP-1)",
        "3": "Well-defined incident response processes in place, regularly tested and updated. (NIST RS.RP-1, SAM 5305.9)",
        "4": "Advanced, adaptive incident response framework implemented with regular simulations and continuous improvement. (NIST RS.RP-1, SAM 5305.9)"
    },
    "Q7": {
        "0": "No established communication protocols for coordinating response activities. (NIST RS.CO-1)",
        "1": "Basic communication protocols exist but are not comprehensive or tested. (NIST RS.CO-1)",
        "2": "Communication protocols are defined but may not cover all stakeholders or scenarios. (NIST RS.CO-1)",
        "3": "Comprehensive communication protocols in place, covering internal and external stakeholders. (NIST RS.CO-1, SAM 5305.9)",
        "4": "Advanced communication framework implemented with regular drills and integration with incident response systems. (NIST RS.CO-1, SAM 5305.9)"
    },
    "Q8": {
        "0": "No recovery planning processes exist to restore systems affected by cybersecurity incidents. (NIST RC.RP-1)",
        "1": "Basic recovery plans exist but lack comprehensiveness or testing. (NIST RC.RP-1)",
        "2": "Recovery planning processes are in place but may not cover all critical systems or scenarios. (NIST RC.RP-1)",
        "3": "Comprehensive recovery plans exist for most systems and are regularly tested. (NIST RC.RP-1, SAM 5305.9)",
        "4": "Advanced, automated recovery systems in place with continuous testing and improvement. (NIST RC.RP-1, SAM 5305.9)"
    },
    "Q9": {
        "0": "No post-incident reviews conducted or lessons learned incorporated. (NIST RC.IM-1)",
        "1": "Basic post-incident reviews conducted but lessons learned not systematically incorporated. (NIST RC.IM-1)",
        "2": "Post-incident reviews conducted with some incorporation of lessons learned. (NIST RC.IM-1)",
        "3": "Regular post-incident reviews conducted with systematic incorporation of lessons learned into strategies. (NIST RC.IM-1, SAM 5305.9)",
        "4": "Advanced post-incident analysis framework with AI-driven insights and continuous strategy refinement. (NIST RC.IM-1, SAM 5305.9)"
    },
    "Q10": {
        "0": "No management of relationships or requirements for third-party providers and partners. (NIST ID.SC-1)",
        "1": "Basic vendor management exists but lacks comprehensive risk assessment or security requirements. (NIST ID.SC-1)",
        "2": "Vendor management processes in place but may not cover all third-party risks or have consistent enforcement. (NIST ID.SC-1)",
        "3": "Comprehensive vendor risk management program in place with regular assessments and enforcement of security requirements. (NIST ID.SC-1, SAM 5305.7)",
        "4": "Advanced third-party risk management framework with continuous monitoring, automated assessments, and proactive risk mitigation. (NIST ID.SC-1, SAM 5305.7)"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const prod = window.location.hostname === 'localhost'
        ? 'http://localhost:9009'
        : 'http://162.240.40.136:9009';

    function loadQuestions() {
        fetch(`${prod}/api/questions/CIO`)
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
            .catch(error => {
                console.error('Error fetching questions:', error);
                alert('Error loading questions. Please try refreshing the page.');
            });
    }

    function displayQuestion() {
        const questionContent = document.getElementById('question-content');
        const question = questions[currentQuestionIndex];

        questionContent.innerHTML = `
            <h2>${question.id}. ${question.question}</h2>
            <p>Component: ${question.component}</p>
            <p>Category: ${question.category}</p>
            <p>Subcategory: ${question.subcategory}</p>
            <div>
                <label for="score">Score:</label>
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
                <label for="comment">Comment:</label>
                <textarea id="comment" rows="4"></textarea>
            </div>
        `;
        document.getElementById('score').addEventListener('change', updateComment);
        updateNavigationButtons();
        highlightWheelComponent(question.component);
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
    function updateComment() {
        const score = document.getElementById('score').value;
        const commentElement = document.getElementById('comment');
        const question = questions[currentQuestionIndex];
        
        if (commentTexts[`Q${question.id}`] && commentTexts[`Q${question.id}`][score]) {
            commentElement.value = commentTexts[`Q${question.id}`][score];
        } else {
            commentElement.value = '';
        }
    }
    
    
    function saveAnswer() {
        const score = document.getElementById('score').value;
        const comment = document.getElementById('comment').value;
        const question = questions[currentQuestionIndex];
        if (!question.id || !question.category || !question.subcategory || score === "") {
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
        }).catch(error => {
            console.error('Detailed error when saving answer:', error);
            return Promise.reject('Error saving answer');
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

            alert('Error saving answer. Please try again.');
        });
    });


    function createWheel() {
        var data = [{
            type: "sunburst",
            labels: ["NIST CSF 2.0", "Identify", "Protect", "Detect", "Respond", "Recover"],
            parents: ["", "NIST CSF 2.0", "NIST CSF 2.0", "NIST CSF 2.0", "NIST CSF 2.0", "NIST CSF 2.0"],
            outsidetextfont: {size: 16, color: "#0d0000"},
            insidetextfont: {size: 14, color: ["#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]},
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
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            sunburstcolorway: originalColors
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

    function highlightWheelComponent(component) {
        if (!wheelPlot) {
            console.error('Wheel plot not initialized');
            return;
        }

        const data = wheelPlot.data[0];
        const newColors = [...originalColors];  // Create a copy of the original colors
        const newSizes = [...originalSizes];    // Create a copy of the original sizes
        const componentIndex = data.labels.findIndex(label => label.toLowerCase() === component.toLowerCase());

        // Reset the last highlighted component
        if (lastHighlightedIndex !== -1) {
            newColors[lastHighlightedIndex] = originalColors[lastHighlightedIndex];
            newSizes[lastHighlightedIndex] = originalSizes[lastHighlightedIndex];
        }

        // Highlight the new component
        if (componentIndex !== -1) {
            newColors[componentIndex] = 'rgba(255, 255, 0, 0.7)'; // Highlight color (yellow with some transparency)
            newSizes[componentIndex] = 1.2; // Increase size by 20%
            lastHighlightedIndex = componentIndex;
        } else {
            lastHighlightedIndex = -1;
        }

        Plotly.restyle(wheelPlot, {
            'marker.colors': [newColors],
            'transforms[0].value': newSizes,  // This will apply the size change
            'transforms[0].type': 'mult'      // This tells Plotly to multiply the original size
        });
    }

    createWheel();
    loadQuestions();
});

