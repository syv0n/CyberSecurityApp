

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

// Function to calculate final score based on scores from score_history
function calculateFinalScore(scores) {
  let finalScore = 0;

  for (const [function_, functionWeight] of Object.entries(functionalWeights)) {
    let functionScore = 0;
    const functionSubcategories = subcategoryWeights[function_];

    for (const [subcategory, subcategoryWeight] of Object.entries(functionSubcategories)) {
      const scoreEntry = scores.find(score => score.component.toLowerCase() === function_.toLowerCase() && score.subcategory === subcategory);
      let subcategoryScore = 0;

      if (scoreEntry) {
        try {
          // Parse score if stored as a JSON string
          const scoreObj = typeof scoreEntry.score === 'string' ? JSON.parse(scoreEntry.score) : scoreEntry.score;
          subcategoryScore = parseFloat(scoreObj[subcategory]) || 0;
        } catch (error) {
          console.error('Error parsing score:', scoreEntry.score, error);
          // Use the score directly if parsing fails
          subcategoryScore = parseFloat(scoreEntry.score) || 0;
        }
      }

      functionScore += subcategoryScore * subcategoryWeight;
    }

    finalScore += functionScore * functionWeight;
  }

  return finalScore;
}

// Function to insert a final assessment score into the database
async function storeFinalScore(finalScore) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO assessment_score_history (assessment_score) VALUES (?)`;
    db.query(query, [finalScore], (err, result) => {
      if (err) {
        console.error('Error inserting final score:', err);
        return reject(err);
      }
      resolve(result);
    });
  });
}

// Function to retrieve the latest assessment score
async function getLatestAssessmentScore() {
  return new Promise((resolve, reject) => {
    const query = `SELECT assessment_score FROM assessment_score_history ORDER BY created_at DESC LIMIT 1`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving latest assessment score:', err);
        return reject(err);
      }
      if (results.length > 0) {
        resolve(results[0].assessment_score);
      } else {
        resolve(null);
      }
    });
  });
}

// Function to retrieve all scores from score_history
async function getAllScores() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM score_history ORDER BY created_at DESC`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving scores:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
}

module.exports = {
  calculateFinalScore,
  storeFinalScore,
  getLatestAssessmentScore,
  getAllScores
};
