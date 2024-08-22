const db = require('../config/database');

class Submission {
    static async create(userId, saveId) {
        const query = `
            INSERT INTO submissions (user_id, save_id, submitted_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)`;
        const [result] = await db.execute(query, [userId, saveId]);
        return { id: result.insertId, userId, saveId, submittedAt: new Date() };
    }

    static async getByUserId(userId) {
        const query = 'SELECT * FROM submissions WHERE user_id = ?';
        const [rows] = await db.execute(query, [userId]);
        return rows;
    }

    static async getById(submissionId) {
        const query = 'SELECT * FROM submissions WHERE id = ?';
        const [rows] = await db.execute(query, [submissionId]);
        return rows[0];
    }
}

module.exports = Submission;
