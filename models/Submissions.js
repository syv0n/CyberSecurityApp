const {db} = require('../config/database');

class Submission {
    static async create(userId, finalScore) {
        const query = `
            INSERT INTO Submissions (user_id, final_score, submitted_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)`;
        const [result] = await db.execute(query, [userId, finalScore]);
        return { id: result.insertId, userId, finalScore, submittedAt: new Date() };
    }

    static async getByUserId(userId) {
        const query = 'SELECT * FROM Submissions WHERE user_id = ? ORDER BY submitted_at DESC';
        const [rows] = await db.execute(query, [userId]);
        return rows;
    }

    static async getById(submissionId) {
        const query = 'SELECT * FROM Submissions WHERE id = ?';
        const [rows] = await db.execute(query, [submissionId]);
        return rows[0];
    }
}


module.exports = Submission;
