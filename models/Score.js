const { db } = require('../config/database');

class Score {
    static async create(userId, category, subcategory, score, comments) {
        const query = 'INSERT INTO scores (user_id, category, subcategory, score, comments) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [userId, category, subcategory, score, comments]);
        return { id: result.insertId, userId, category, subcategory, score, comments };
    }

    static async update(id, score, comments) {
        const query = 'UPDATE scores SET score = ?, comments = ? WHERE id = ?';
        const [result] = await db.execute(query, [score, comments, id]);
        return result.affectedRows > 0 ? { id, score, comments } : null;
    }

    static async findByUserCategorySubcategory(userId, category, subcategory) {
        const query = 'SELECT * FROM scores WHERE user_id = ? AND category = ? AND subcategory = ?';
        const [rows] = await db.execute(query, [userId, category, subcategory]);
        return rows[0] || null;
    }

    static async findByUserIdAndCategory(userId, category) {
        const query = 'SELECT * FROM scores WHERE user_id = ? AND category = ?';
        const [rows] = await db.execute(query, [userId, category]);
        return rows;
    }

    static async delete(id) {
        const query = 'DELETE FROM scores WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }

    static async findAllByUserId(userId) {
        const query = 'SELECT * FROM scores WHERE user_id = ?';
        const [rows] = await db.execute(query, [userId]);
        return rows;
    }

    static async findAll() {
        const query = 'SELECT * FROM scores';
        const [rows] = await db.execute(query);
        return rows;
    }

    static async findByDateRange(startDate, endDate) {
        const query = 'SELECT * FROM scores WHERE created_at BETWEEN ? AND ?';
        const [rows] = await db.execute(query, [startDate, endDate]);
        return rows;
    }
}

module.exports = Score;