// Import the correct db object from your config file
const { db } = require("../config/database");

class Questions {
  static async findByRole(role) {
    const query = `
            SELECT q.id, q.question, 
                c.id AS category_id, c.name AS category, 
                s.id AS subcategory_id, s.name AS subcategory,
                comp.id AS component_id, comp.name AS component
            FROM Questions q
            JOIN Categories c ON q.category_id = c.id
            JOIN Subcategories s ON q.subcategory_id = s.id
            JOIN Components comp ON q.component_id = comp.id
            WHERE q.user_type = ?
        `;
    const [rows] = await db.execute(query, [role]);
    return rows;
  }
}

module.exports = Questions;
