// Import the correct db object from your config file
const { db } = require('../config/database');

class Questions {
    static async findByRole(role) {
        const query = `
            SELECT q.id, q.question, c.name AS category, s.name AS subcategory
            FROM Questions q
            JOIN Categories c ON q.category_id = c.id
            JOIN Subcategories s ON q.subcategory_id = s.id
            WHERE q.user_type = ?
        `;
        // Execute the query directly on the pool
        const [rows] = await db.execute(query, [role]); // This line is now correct
        return rows;
    }
}

module.exports = Questions;
