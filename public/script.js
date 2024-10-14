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

 data.forEach(item => {
   html += `
     <tr>
       <td>${item.Category}</td>
       <td>${item.Subcategory}</td>
       <td>${item.Foundational_Objective || item.OIS_Foundational_Objective}</td>
       <td>${item.Maturity_Level}</td>
       <td>${item.Information_Source}</td>
       <td><input type="number" min="0" max="10" step="0.1" value="${item.Score || ''}" onchange="updateScore('${component}', '${item.Category}', this.value)"></td>
     </tr>
   `;
 });

 html += '</tbody></table>';
 html += '<button id="submit-btn" onclick="submitScores(\'' + component + '\')">Submit Scores</button>';
 container.innerHTML = html;
}

const scores = {};

function updateScore(component, category, value) {
 if (!scores[component]) {
   scores[component] = {};
 }
 scores[component][category] = parseFloat(value);
}

async function submitScores(component) {
 const scoresToSubmit = Object.entries(scores[component] || {}).map(([category, score]) => ({
   Category: category,
   Score: { [category]: score }
 }));

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
   
   // Clear the scores for this component after successful submission
   scores[component] = {};
 } catch (error) {
   console.error('Error submitting scores:', error);
 }
}


async function loadFinalScore() { 
  try { 
  const response = await fetch(`${API_BASE_URL}/assessment-score`);
  
  if (!response.ok) throw new Error(`Server error`);
  
  const data = await response.json();
  
  document.getElementById('final-score-display').innerText = `Assessment Score: ${data.assessmentScore}`;
  } catch (error) { 
  console.error('Error loading assessment score:', error); 
  }
  }
  