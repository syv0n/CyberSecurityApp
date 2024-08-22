const Submission = require('../models/Submissions');

exports.createSubmission = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { saveId } = req.body;

        const newSubmission = await Submission.create(userId, saveId);

        res.status(201).json({ message: 'Submission created successfully', submission: newSubmission });
    } catch (error) {
        res.status(500).json({ message: 'Error creating submission', error: error.message });
    }
};

exports.getSubmissionsByUser = async (req, res) => {
    try {
        const userId = req.userData.userId;

        const submissions = await Submission.findByUserId(userId);

        res.status(200).json({ submissions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
};
