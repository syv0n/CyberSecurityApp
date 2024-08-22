const Save = require('../models/Saves');

exports.createSave = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { description } = req.body;

        const newSave = await Save.create(userId, description);

        res.status(201).json({ message: 'Save created successfully', save: newSave });
    } catch (error) {
        res.status(500).json({ message: 'Error creating save', error: error.message });
    }
};

exports.getSavesByUser = async (req, res) => {
    try {
        const userId = req.userData.userId;

        const saves = await Save.findByUserId(userId);

        res.status(200).json({ saves });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching saves', error: error.message });
    }
};
