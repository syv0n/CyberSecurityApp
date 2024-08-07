const { db } = require('../config/database');

class User {
    static async create(username, email, password) {
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id';
        const values = [username, email, password];
        const { rows } = await db.query(query, values);
        return { id: rows[0].id };
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await db.query(query, [email]);
        return rows[0] || null;
    }

    static async findById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0] || null;
    }

    static async update(id, username, email) {
        const query = 'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *';
        const values = [username, email, id];
        const { rows } = await db.query(query, values);
        return rows[0] || null;
    }

    static async delete(id) {
        const query = 'DELETE FROM users WHERE id = $1';
        const { rowCount } = await db.query(query, [id]);
        return rowCount > 0;
    }
}

module.exports = User;