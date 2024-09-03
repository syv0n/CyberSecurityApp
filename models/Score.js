const {db} = require('../config/database');

class Score {
    static async create(userId, questionId, component, category, subcategory, score, comments) {
        const query = `
            INSERT INTO Scores (user_id, question_id, component, category, subcategory, score, comments)
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
            UPDATE Scores
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
            SELECT * FROM Scores 
            WHERE user_id = ? AND category_id = ? AND subcategory_id = ?`;
        const [rows] = await db.execute(query, [userId, categoryId, subcategoryId]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async findByCategory(userId) {
        const query = 'SELECT * FROM Scores WHERE user_id = ? ORDER BY created_at DESC LIMIT 10';
        console.log('Executing query:', query, 'with params:', [userId]);
        const [rows] = await db.execute(query, [userId]);
        console.log('Query result:', rows);
    
        // If category is provided, filter; otherwise, return all rows
        return rows;
    }
    

}
module.exports = Score;


