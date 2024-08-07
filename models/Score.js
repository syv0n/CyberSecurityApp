const { sql } = require('../config/database');

class Score {
    static async create(userId, category, subcategory, score, comments) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .input('category', sql.VarChar(50), category)
            .input('subcategory', sql.VarChar(50), subcategory)
            .input('score', sql.Int, score)
            .input('comments', sql.Text, comments)
            .query('INSERT INTO Scores (userId, category, subcategory, score, comments) VALUES (@userId, @category, @subcategory, @score, @comments); SELECT SCOPE_IDENTITY() AS id');
        return result.recordset[0];
    }

    static async update(id, score, comments) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('score', sql.Int, score)
            .input('comments', sql.Text, comments)
            .input('updatedAt', sql.DateTime, new Date())
            .query('UPDATE Scores SET score = @score, comments = @comments, updatedAt = @updatedAt WHERE id = @id; SELECT * FROM Scores WHERE id = @id');
        return result.recordset[0];
    }

    static async findByUserCategorySubcategory(userId, category, subcategory) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .input('category', sql.VarChar(50), category)
            .input('subcategory', sql.VarChar(50), subcategory)
            .query('SELECT * FROM Scores WHERE userId = @userId AND category = @category AND subcategory = @subcategory');
        return result.recordset[0];
    }

    static async findByUserIdAndCategory(userId, category) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .input('category', sql.VarChar(50), category)
            .query('SELECT * FROM Scores WHERE userId = @userId AND category = @category');
        return result.recordset;
    }

    static async delete(id) {
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Scores WHERE id = @id');
        return { message: 'Score deleted successfully' };
    }

    static async findAllByUserId(userId) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM Scores WHERE userId = @userId');
        return result.recordset;
    }

    static async findAll() {
        const pool = await sql.connect();
        const result = await pool.request()
            .query('SELECT * FROM Scores');
        return result.recordset;
    }

    static async findByDateRange(startDate, endDate) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('startDate', sql.DateTime, new Date(startDate))
            .input('endDate', sql.DateTime, new Date(endDate))
            .query('SELECT * FROM Scores WHERE createdAt BETWEEN @startDate AND @endDate');
        return result.recordset;
    }
}

module.exports = Score;
