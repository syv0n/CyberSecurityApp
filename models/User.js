const { db } = require('../config/database');
const crypto = require('crypto');

class User {
    static async create(username, email, password) {
        const query = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [username, email, password]);
        return { id: result.insertId };
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM Users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0] || null;
    }

    static async findById(id) {
        const query = 'SELECT * FROM Users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0] || null;
    }

    static async update(id, username, email) {
        const query = 'UPDATE Users SET username = ?, email = ? WHERE id = ?';
        const [result] = await db.execute(query, [username, email, id]);
        return result.affectedRows > 0 ? { id, username, email } : null;
    }

    static async delete(id) {
        const query = 'DELETE FROM Users WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }

    static async findAll() {
        const query = 'SELECT * FROM Users';
        const [rows] = await db.execute(query);
        return rows;
    }

    static async createVerificationToken(id) {
        const token = crypto.randomBytes(32).toString('hex');
        const query = 'UPDATE Users SET verificationToken = ?, isVerified = FALSE WHERE id = ?';
        await db.execute(query, [token, id]);
        return token;
    }
    
    static async verifyEmail(token) {
        const query = 'UPDATE Users SET isVerified = TRUE, verificationToken = NULL WHERE verificationToken = ?';
        const [result] = await db.execute(query, [token]);
        return result.affectedRows > 0;
    }

    static async isEmailVerified(id) {
        const query = 'SELECT isVerified FROM Users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0] ? rows[0].isVerified : false;
    }
    
    
    static async findByResetToken(token) {
        const query = 'SELECT * FROM Users WHERE resetToken = ?';
        const [rows] = await db.execute(query, [token]);
        return rows[0] || null;
    }
    
    static async updatePassword(id, newPassword) {
        const query = 'UPDATE Users SET password = ? WHERE id = ?';
        await db.execute(query, [newPassword, id]);
    }
    
    static async clearResetToken(id) {
        const query = 'UPDATE Users SET resetToken = NULL, resetTokenExpiry = NULL WHERE id = ?';
        await db.execute(query, [id]);
    }
    static async setResetToken(id, token, expiry) {
        // Convert milliseconds to a MySQL compatible datetime
        const expiryDate = new Date(expiry).toISOString().slice(0, 19).replace('T', ' ');
        
        const query = 'UPDATE Users SET resetToken = ?, resetTokenExpiry = ? WHERE id = ?';
        await db.execute(query, [token, expiryDate, id]);
    }
      
}

module.exports = User;