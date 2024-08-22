const Questions = require('../models/Questions');

exports.getQuestionsByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const questions = await Questions.findByRole(role);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error: error.message });
    }
};