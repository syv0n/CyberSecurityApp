const { db } = require('../config/database');

const Simm = {
  getComponentScores: (component) => {
    const query = `SELECT * FROM ${component}`;
    return db.query(query);
  },

  insertScore: (component, category, subcategory, score) => {
    const query = `INSERT INTO score_history (component, category, subcategory, score) VALUES (?, ?, ?, ?)`;
    const scoreValue = JSON.stringify({ [subcategory]: score });
    return db.query(query, [component, category, subcategory, scoreValue]);
  },

  getAllScores: () => {
    const query = `SELECT * FROM score_history ORDER BY created_at DESC`;
    return db.query(query);
  },

  insertAssessmentScore: (finalScore) => {
    const query = `INSERT INTO assessment_score_history (assessment_score) VALUES (?)`;
    return db.query(query, [finalScore]);
  },

}

const getLatestAssessmentScore = () => {
  const query = `SELECT assessment_score FROM assessment_score_history ORDER BY created_at DESC LIMIT 1`;
  return db.query(query);
};

module.exports = {Simm, getLatestAssessmentScore};