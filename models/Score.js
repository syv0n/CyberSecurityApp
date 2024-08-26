const {db} = require('../config/database');

class Score {
    static async create(userId, questionId, component, category, subcategory, score, comments) {
        const query = `
            INSERT INTO scores (user_id, question_id, component, category, subcategory, score, comments)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.execute(query, [
            userId,
            questionId,
            component,
            category,
            subcategory,
            score,
            comments
        ]);
        return { id: result.insertId, userId, questionId, component, category, subcategory, score, comments };
    }

    static async update(scoreId, currentState, comments = null) {
        const query = `
            UPDATE scores
            SET score = ?, comments = ?
            WHERE id = ?`;
        const [result] = await db.execute(query, [
            score,
            comments,
            scoreId
        ]);
        return result.affectedRows > 0;
    }

    static async findByUserCategorySubcategory(userId, categoryId, subcategoryId) {
        const query = `
            SELECT * FROM scores 
            WHERE user_id = ? AND category_id = ? AND subcategory_id = ?`;
        const [rows] = await db.execute(query, [userId, categoryId, subcategoryId]);
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = Score;

module.exports = Score;
