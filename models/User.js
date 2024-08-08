const { db } = require('../config/database');

class User {
    static async create(username, email, password) {
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [username, email, password]);
        return { id: result.insertId };
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0] || null;
    }

    static async findById(id) {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0] || null;
    }

    static async update(id, username, email) {
        const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
        const [result] = await db.execute(query, [username, email, id]);
        return result.affectedRows > 0 ? { id, username, email } : null;
    }

    static async delete(id) {
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }

    static async findAll() {
        const query = 'SELECT * FROM users';
        const [rows] = await db.execute(query);
        return rows;
    }
}

module.exports = User;