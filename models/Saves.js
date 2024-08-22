const db = require('../config/database');

class Save {
    static async create(userId, description = '') {
        const query = `
            INSERT INTO saves (user_id, description)
            VALUES (?, ?)`;
        const [result] = await db.execute(query, [userId, description]);
        return { id: result.insertId, userId, description, createdAt: new Date() };
    }

    static async getByUserId(userId) {
        const query = 'SELECT * FROM saves WHERE user_id = ?';
        const [rows] = await db.execute(query, [userId]);
        return rows;
    }

    static async getById(saveId) {
        const query = 'SELECT * FROM saves WHERE id = ?';
        const [rows] = await db.execute(query, [saveId]);
        return rows[0];
    }
}

module.exports = Save;
