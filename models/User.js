const { sql } = require('../config/database');

class User {
    static async create(username, email, password) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('INSERT INTO Users (username, email, password) VALUES (@username, @email, @password); SELECT SCOPE_IDENTITY() AS id');
        return result.recordset[0];
    }

    static async findByEmail(email) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');
        return result.recordset[0];
    }

    static async findById(id) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Users WHERE id = @id');
        return result.recordset[0];
    }

    static async update(id, username, email) {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .query('UPDATE Users SET username = @username, email = @email WHERE id = @id; SELECT * FROM Users WHERE id = @id');
        return result.recordset[0];
    }

    static async delete(id) {
        const pool = await sql.connect();
        const result = await pool.request()
          .input('id', sql.Int, id)
          .query('DELETE FROM Users WHERE id = @id');
        return result.rowsAffected[0] > 0;
    }
}

module.exports = User;