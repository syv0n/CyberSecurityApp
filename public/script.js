const API_BASE_URL = 'http://localhost:3000/api';

async function loadComponent(component) {
  try {
    const response = await fetch(`${API_BASE_URL}/${component}`);
    const data = await response.json();
    renderAssessmentTable(component, data);
  } catch (error) {
    console.error('Error loading component:', error);
    document.getElementById('assessment-container').innerHTML = '<p>Error loading assessment data.</p>';
  }
}

function renderAssessmentTable(component, data) {
  const container = document.getElementById('assessment-container');
  let html = `<h2>${component.charAt(0).toUpperCase() + component.slice(1)} Assessment</h2>`;
  html += '<table><thead><tr><th>Category</th><th>Subcategory</th><th>Foundational Objective</th><th>Maturity Level</th><th>Information Source</th><th>Score</th></tr></thead><tbody>';

  data.forEach((item, index) => {
    const subcategory = item.Subcategory || item.Subcatagory || '';
    const foundationalObjective = item.Foundational_Objective || item['OIS Foundational Objective'] || item.OIS_Foundational_Objective || '';
    const maturityLevel = item.Maturity_Level || item['Maturity Level'] || '';
    const informationSource = item.Information_Source || item['Information Source'] || '';

    html += `
     <tr>
       <td>${item.Category || ''}</td>
       <td>${subcategory}</td>
       <td>${foundationalObjective}</td>
       <td>${maturityLevel}</td>
       <td>${informationSource}</td>
       <td><input type="number" min="0" max="10" step="0.1" value="${item.Score || ''}" onchange="updateScore('${component}', '${item.Category}', '${subcategory}', this.value, ${index})"></td>
     </tr>
   `;
  });

  html += '</tbody></table>';
  html += '<button id="submit-btn" onclick="submitScores(\'' + component + '\')">Submit Scores</button>';
  container.innerHTML = html;
}

const scores = {};

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


async function submitScores(component) {
  const scoresToSubmit = scores[component].filter(score => score !== undefined);

  if (scoresToSubmit.length === 0) {
    alert('No scores to submit');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${component}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scores: scoresToSubmit }),
    });

    if (!response.ok) throw new Error(`Server error`);

    const data = await response.json();
    alert(data.message);

    scores[component] = []; 

    if (allComponentsSubmitted()) {
      await calculateAndDisplayFinalScore();
    }

  } catch (error) {
    console.error('Error submitting scores:', error);
  }
}


function allComponentsSubmitted() {
  const components = ['identify', 'protect', 'detect', 'respond', 'recovery'];
  return components.every(component => scores[component] && scores[component].length === 0);
}

async function calculateAndDisplayFinalScore() {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate_final_score`, {
      method: 'POST',
    });

    if (!response.ok) {
      const message = `Server error: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    const data = await response.json();
    console.log('Final score calculated and stored:', data);

    // Directly display score out of 4
    const scoreOutOfFour = data.assessmentScore.toFixed(2); // Assuming assessmentScore is already out of 4
    document.getElementById('final-score-display').innerText = `Assessment Score: ${scoreOutOfFour} / 4`;

  } catch (error) {
    console.error('Error calculating and displaying final score:', error);
    document.getElementById('final-score-display').innerText = 'Error calculating assessment score.';
  }
}
