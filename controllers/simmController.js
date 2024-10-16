const { Simm, getLatestAssessmentScore } = require('../models/Simm');
const { functionalWeights, subcategoryWeights, calculateFinalScore } = require('../services/simmService');

const scoreController = {
  getComponentScores: async (req, res) => {
    const { component } = req.params;
    try {
      const [results] = await Simm.getComponentScores(component);
      res.json(results);
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error' });
    }
  },

  submitScores: async (req, res) => {
    const { component } = req.params;
    const { scores } = req.body;
    try {
      const insertPromises = scores.map(score => 
        Simm.insertScore(component, score.Category, score.Subcategory, score.Score)
      );
      await Promise.all(insertPromises);
      res.json({ message: `${scores.length} scores inserted successfully` });
    } catch (err) {
      console.error('Error inserting scores:', err);
      res.status(500).json({ error: 'Database error' });
    }
  },

  calculateFinalScore: async (req, res) => {
    try {
      const [results] = await Simm.getAllScores();
      const finalScore = calculateFinalScore(results);
      await Simm.insertAssessmentScore(finalScore);
      res.json({ message: 'Final score calculated and stored successfully', assessmentScore: finalScore });
    } catch (err) {
      console.error('Error calculating final score:', err);
      res.status(500).json({ error: 'Database error' });
    }
  },

  getLatestAssessmentScore: async (req, res) => {
    try {
        const [results] = await getLatestAssessmentScore();
        console.log('Query results:', results);
        if (results.length > 0) {
            res.json({ assessmentScore: results[0].assessment_score });
        } else {
            res.json({ message: 'No assessment scores available' });
        }
    } catch (err) {
        console.error('Error getting latest assessment score:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
}

};

module.exports = scoreController;