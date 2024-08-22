const db = require('../config/database');

class Score {
    static async create(userId, subcategoryId, componentId, categoryId, currentState, targetState, saveId = null, comments = null) {
        const query = `
            INSERT INTO scores (user_id, subcategory_id, component_id, category_id, current_state, target_state, save_id, comments)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.execute(query, [
            userId,
            subcategoryId,
            componentId,
            categoryId,
            currentState,
            targetState,
            saveId,
            comments
        ]);
        return { id: result.insertId, userId, subcategoryId, componentId, categoryId, currentState, targetState, saveId, comments };
    }

    static async getBySaveId(saveId) {
        const query = 'SELECT * FROM scores WHERE save_id = ?';
        const [rows] = await db.execute(query, [saveId]);
        return rows;
    }

    static async update(scoreId, currentState, targetState, comments = null) {
        const query = `
            UPDATE scores
            SET current_state = ?, target_state = ?, comments = ?
            WHERE id = ?`;
        const [result] = await db.execute(query, [
            currentState,
            targetState,
            comments,
            scoreId
        ]);
        return result.affectedRows > 0;
    }
}

module.exports = Score;
