const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'SIMM_5300C'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

const functionalWeights = {
  Identify: 0.25,
  Protect: 0.20,
  Detect: 0.25,
  Respond: 0.20,
  Recover: 0.10
};

const subcategoryWeights = {
  Identify: {
    "ID.AM-1": 0.15,
    "ID.AM-2": 0.15,
    "ID.AM-5": 0.10,
    "ID.BE-5": 0.05,
    "ID.GV-1a": 0.10,
    "ID.GV-1b": 0.10,
    "ID.GV-2": 0.05,
    "ID.GV-4": 0.20,
    "ID.RA-1": 0.10
  },
 Protect: {
   "PR.AC-1": 0.10,
   "PR.AC-2": 0.07,
   "PR.AC-3": 0.05,
   "PR.AC-5": 0.05,
   "PR.AT-1": 0.05,
   "PR.AT-2": 0.05,
   "PR.DS-1a": 0.05,
   "PR.DS-1b": 0.05,
   "PR.DS-2": 0.10,
   "PR.IP-1": 0.05,
   "PR.IP-3": 0.10,
   "PR.IP-5": 0.05,
   "PR.IP-9": 0.10,
   "PR.IP-10": 0.05,
   "PR.IP-12": 0.08
 },
 Detect: {
   "DE.AE-3": 0.20,
   "DE.CM-1": 0.20,
   "DE.CM-4": 0.20,
   "DE.CM-8": 0.20,
   "DE.DP-1": 0.05,
   "DE.DP-3": 0.05,
   "DE.DP-4": 0.10
 },
 Respond: {
   "RS.RP-1": 0.25,
   "RS.CO-1": 0.25,
   "RS.CO-2": 0.25,
   "RS.AN-1": 0.25
 },
 Recover: {
   "RC.RP-1": 1.00
 }
};

app.get('/api/:component', (req, res) => {
 const { component } = req.params;
 const query = `SELECT * FROM ${component}`;

 db.query(query, (err, results) => {
   if (err) {
     console.error('Database error:', err);
     res.status(500).json({ error: 'Database error' });
   } else {
     res.json(results);
   }
 });
});

app.post('/api/:component/submit', (req, res) => {
 const { component } = req.params;
 const { scores } = req.body;

 console.log(`Received submission for ${component}:`, scores);

 const insertPromises = scores.map(score => {
   return new Promise((resolve, reject) => {
     const category = Object.keys(score.Score)[0];
     const scoreValue = score.Score[category];

     // Insert score into the score_history table
     const query = `INSERT INTO score_history (component, category, subcategory, score) VALUES (?, ?, ?, ?)`;
     const subcategory = ''; // Add logic to derive subcategory if necessary.
     console.log('Executing query:', query, [component, category, subcategory, JSON.stringify(scoreValue)]);
     db.query(query, [component, category, subcategory, JSON.stringify(scoreValue)], (err, result) => {
       if (err) {
         console.error('Error inserting score:', err);
         reject(err);
       } else {
         console.log('Insert result:', result);
         resolve(result);
       }
     });
   });
 });

 Promise.all(insertPromises)
   .then((results) => {
     const insertedCount = results.length;
     console.log(`${insertedCount} scores inserted successfully`);
     res.json({ message: `${insertedCount} scores inserted successfully` });
   })
   .catch(err => {
     console.error('Error inserting scores:', err);
     res.status(500).json({ error: 'Database error', details: err.message });
   });
});

function calculateFinalScore(scores) {
 let finalScore = 0;

 for (const [function_, functionWeight] of Object.entries(functionalWeights)) {
   let functionScore = 0;
   const functionSubcategories = subcategoryWeights[function_];

   for (const [subcategory, subcategoryWeight] of Object.entries(functionSubcategories)) {
     // Assuming scores are stored as JSON strings in the database
     const scoreEntry = scores.find(score => score.component === function_ && score.category === subcategory);
     const subcategoryScore = scoreEntry ? JSON.parse(scoreEntry.score)[subcategory] : null;
     functionScore += parseFloat(subcategoryScore || '0') * subcategoryWeight;
   }

   finalScore += functionScore * functionWeight;
 }

 return finalScore;
}

app.get('/api/latest-assessment-score', (req, res) => {
 const query = `SELECT assessment_score FROM assessment_score_history ORDER BY created_at DESC LIMIT 1`;
 db.query(query, (err, results) => {
 if (err) {
 console.error('Error retrieving latest assessment score:', err);
 res.status(500).json({ error: 'Database error' });
 } else {
 if (results.length > 0) {
 const latestAssessmentScore = results[0].assessment_score;
 res.json({ assessmentScore: latestAssessmentScore });
 } else {
 res.json({ message: 'No assessment scores available' });
 }
 }
 });
});

app.get('/api/assessment-score', (req, res) => {
 const query = `SELECT * FROM score_history ORDER BY created_at DESC`;
 db.query(query, (err, results) => {
 if (err) {
 console.error('Error retrieving scores:', err);
 res.status(500).json({ error: 'Database error' });
 } else {
 try {
// Calculate the final score using the retrieved scores
const finalScore = calculateFinalScore(results);

// Insert the calculated final score into assessment_score_history table
const insertQuery = `INSERT INTO assessment_score_history (assessment_score) VALUES (?)`;
db.query(insertQuery, [finalScore], (insertErr) => {
if (insertErr) {
console.error('Error inserting assessment score:', insertErr);
res.status(500).json({ error: 'Database error', details: insertErr.message });
} else {
res.json({ assessmentScore: finalScore });
}
});
} catch (error) {
console.error('Error calculating assessment score:', error);
res.status(500).json({ error: 'Error calculating assessment score', details: error.message });
}
}
});
});

// Serve the HTML page for all other routes
app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
