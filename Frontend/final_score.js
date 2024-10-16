document.addEventListener("DOMContentLoaded", () => {
    const prod =
      window.location.hostname === "localhost"
        ? "http://localhost:9009"
        : "http://162.240.40.136:9009";

    let currentFinalScore = 0;
    let currentFunctionScores = {};

    function handleMobileZoom() {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        // This is a mobile device
        document.addEventListener("gesturestart", function (e) {
          e.preventDefault();
          // special hack to prevent zoom-to-tabs gesture in safari
          document.body.style.zoom = 0.99;
        });

        document.addEventListener("gesturechange", function (e) {
          e.preventDefault();
          // special hack to prevent zoom-to-tabs gesture in safari
          document.body.style.zoom = 0.99;
        });

        document.addEventListener("gestureend", function (e) {
          e.preventDefault();
          // special hack to prevent zoom-to-tabs gesture in safari
          document.body.style.zoom = 1;
        });
      }
    }

    // Call this function when the page loads
    window.onload = handleMobileZoom;

    function loadFinalScore() {
      // Get submissionId from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const submissionId = urlParams.get("submissionId");
      console.log("Retrieved submission ID:", submissionId); // Add this log
      fetch(`${prod}/api/submissions/scores/final_score`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Received final score data:", data);
          if (
            data &&
            typeof data.finalScore === "number" &&
            data.functionScores
          ) {
            currentFinalScore = data.finalScore;
            currentFunctionScores = data.functionScores;
            displayFinalScore(data.finalScore, data.functionScores);
          } else {
            throw new Error("Invalid data structure received from server");
          }
        })
        .catch((error) => {
          console.error("Error fetching final score:", error);
          document.getElementById(
            "finalScore"
          ).innerHTML = `Error: ${error.message}`;
        });
    }

    function getScoreColor(score) {
      if (score <= 1.0) return "#e74c3c";
      if (score <= 2.0) return "#f39c12";
      if (score <= 3.0) return "#f1c40f";
      return "#27ae60";
    }

    function getInterpretation(score) {
      if (score <= 1.0) {
        return {
          title: "Initial Stage",
          description:
            "Your organization is at the beginning of its cybersecurity journey. Immediate action is required to establish basic security practices and policies. This stage is characterized by ad-hoc and often reactive approaches to cybersecurity.",
          details: [
            "Limited awareness of cybersecurity risks across the organization",
            "Absence of formal security policies and procedures",
            "Reactive approach to security incidents",
            "Minimal compliance with regulatory requirements",
            "High vulnerability to both internal and external threats",
          ],
        };
      } else if (score <= 2.0) {
        return {
          title: "Developing Stage",
          description:
            "Your organization has begun implementing cybersecurity measures, but there's significant room for improvement in consistency and coverage. At this stage, some basic protections are in place, but they may not be comprehensive or consistently applied.",
          details: [
            "Basic security policies are in place, but not consistently enforced",
            "Some security controls implemented, but gaps remain",
            "Improved awareness of cybersecurity risks, but not organization-wide",
            "Partial compliance with relevant regulations and standards",
            "Inconsistent incident response capabilities",
          ],
        };
      } else if (score <= 3.0) {
        return {
          title: "Established Stage",
          description:
            "Your organization has a solid foundation in cybersecurity with consistent implementation of security practices across most areas. At this stage, there's a formal, documented approach to cybersecurity risk management and protection.",
          details: [
            "Comprehensive security policies and procedures in place",
            "Regular risk assessments and security audits conducted",
            "Strong incident response capabilities with regular testing",
            "Good alignment with industry standards and regulatory requirements",
            "Proactive threat monitoring and vulnerability management",
          ],
        };
      } else {
        return {
          title: "Advanced Stage",
          description:
            "Your organization demonstrates a mature, proactive, and adaptive cybersecurity program that aligns with best practices and standards. At this stage, cybersecurity is an integral part of the organization's culture and operations.",
          details: [
            "Cutting-edge security technologies and practices implemented",
            "Continuous monitoring and improvement of security posture",
            "Strong security culture embedded throughout the organization",
            "Leadership in cybersecurity within your industry",
            "Robust compliance with all relevant standards and regulations",
          ],
        };
      }
    }

    function getSuggestions(score) {
      if (score <= 1.0) {
        return [
          "Establish a basic set of cybersecurity policies aligned with NIST Cybersecurity Framework",
          "Implement fundamental security controls as outlined in CIS Controls v8",
          "Conduct a comprehensive risk assessment to identify critical assets and vulnerabilities",
          "Develop an incident response plan based on NIST SP 800-61",
          "Ensure compliance with CCPA requirements for data protection and user privacy",
          "Implement basic security awareness training for all employees",
          "Begin aligning with SIMM 5305-A for overall IT security program management",
        ];
      } else if (score <= 2.0) {
        return [
          "Enhance existing security controls to align with NIST SP 800-53 recommendations",
          "Implement a formal risk management process following NIST Risk Management Framework",
          "Develop a comprehensive Business Continuity and Disaster Recovery plan",
          "Strengthen identity and access management practices as per NIST SP 800-63",
          "Enhance network segmentation and implement zero trust architecture principles",
          "Conduct regular vulnerability assessments and penetration testing",
          "Improve compliance with SIMM 5305-A, focusing on risk assessment and management",
        ];
      } else if (score <= 3.0) {
        return [
          "Implement advanced threat detection and response capabilities",
          "Enhance data protection measures, including encryption and data loss prevention",
          "Develop a comprehensive third-party risk management program",
          "Implement a formal security metrics program to measure and improve security posture",
          "Enhance cloud security measures in alignment with NIST SP 800-144",
          "Conduct regular tabletop exercises to test and improve incident response",
          "Further align with SIMM 5305-A, focusing on continuous monitoring and improvement",
        ];
      } else {
        return [
          "Implement AI and machine learning for advanced threat detection and response",
          "Develop a comprehensive DevSecOps program",
          "Implement advanced security orchestration and automated response (SOAR) capabilities",
          "Enhance insider threat detection and prevention programs",
          "Implement quantum-safe cryptography measures",
          "Lead industry-wide cybersecurity initiatives and information sharing",
          "Achieve full compliance with SIMM 5305-A and maintain leadership in cybersecurity practices",
        ];
      }
    }

    function displayFinalScore(finalScore, functionScores) {
      document.getElementById("finalScore").textContent =
        finalScore.toFixed(2);

      const interpretation = getInterpretation(finalScore);
      const interpretationText = `
                <h3>${interpretation.title}</h3>
                <p>${interpretation.description}</p>
                <ul>
                    ${interpretation.details
                      .map((detail) => `<li>${detail}</li>`)
                      .join("")}
                </ul>
            `;
      document.getElementById("interpretationText").innerHTML =
        interpretationText;

      const suggestions = getSuggestions(finalScore);
      const suggestionList = document.getElementById("suggestionList");
      suggestionList.innerHTML = suggestions
        .map((suggestion) => `<li>${suggestion}</li>`)
        .join("");

      const functionScoresContainer =
        document.getElementById("functionScores");
      functionScoresContainer.innerHTML = "";
      for (const [func, details] of Object.entries(functionScores)) {
        if (
          details &&
          typeof details.score === "number" &&
          typeof details.weight === "number"
        ) {
          const functionScoreElement = document.createElement("div");
          functionScoreElement.className = "function-score";
          functionScoreElement.innerHTML = `
                        <div class="function-name">${func}</div>
                        <div class="function-value">${details.score.toFixed(
                          2
                        )}</div>
                        <div>Weight: ${(details.weight * 100).toFixed(
                          0
                        )}%</div>
                    `;
          functionScoresContainer.appendChild(functionScoreElement);
        }
      }

      // Create doughnut chart
      const ctx = document.getElementById("scoreChart").getContext("2d");
      new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [finalScore, 4 - finalScore],
              backgroundColor: [getScoreColor(finalScore), "#ecf0f1"],
            },
          ],
        },
        options: {
          cutout: "70%",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      });
    }

    document
      .getElementById("view-calculation")
      .addEventListener("click", () => {
        displayCalculationDetails();
        document.getElementById("calculation-modal").style.display =
          "block";
      });

    document.getElementById("close-modal").addEventListener("click", () => {
      document.getElementById("calculation-modal").style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target == document.getElementById("calculation-modal")) {
        document.getElementById("calculation-modal").style.display = "none";
      }
    };

    function displayCalculationDetails() {
      const detailsContainer = document.getElementById(
        "calculation-details"
      );
      let html = `
                <h3>Calculation Methodology</h3>
                <p>The final maturity score is calculated using a weighted average of the five NIST Cybersecurity Framework functions: Identify, Protect, Detect, Respond, and Recover.</p>
                <h4>Function Scores:</h4>
                <ul>
            `;

      for (const [func, details] of Object.entries(currentFunctionScores)) {
        html += `<li>${func}: ${details.score.toFixed(2)} (Weight: ${(
          details.weight * 100
        ).toFixed(0)}%)</li>`;
      }

      html += `
                </ul>
                <h4>Final Score Calculation:</h4>
                <p>Final Score = Sum of (Function Score × Function Weight) for all functions</p>
                <p>Final Score = ${currentFinalScore.toFixed(2)}</p>
                <h3>Alignment with Standards</h3>
                <ul>
                    <li>NIST Cybersecurity Framework: This score directly reflects your alignment with the five core functions of the NIST framework.</li>
                    <li>SIMM 5305-A: The score indicates your progress in implementing California's Statewide Information Management Manual requirements.</li>
                    <li>CIS Controls: Higher scores suggest better implementation of Critical Security Controls.</li>
                </ul>
            `;

      detailsContainer.innerHTML = html;
    }

    function submitScoreAndPrint() {
        // Show loading indicator
        document.getElementById('loading-indicator').style.display = 'block';
    
        // Submit the score
        fetch(`${prod}/api/submissions/new_submission`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ finalScore: currentFinalScore })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Score submitted successfully!");
            
            // Show alert immediately after score submission
            alert('Final score has been successfully submitted.');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
    
            // Trigger email notification asynchronously
            fetch(`${prod}/api/submissions/notify-submission`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the score. Please try again.');
        })
        .finally(() => {
            // Hide loading indicator
            document.getElementById('loading-indicator').style.display = 'none';
        });
    }

    document.getElementById('submit-score').addEventListener('click', submitScoreAndPrint);

    loadFinalScore();
  });

  