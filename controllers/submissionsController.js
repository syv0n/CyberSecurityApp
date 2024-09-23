const Submission = require('../models/Submissions');

exports.createSubmission = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { finalScore } = req.body;

        if (typeof finalScore !== 'number' || finalScore < 0 || finalScore > 4) {
            return res.status(400).json({ message: 'Invalid final score' });
        }

        const newSubmission = await Submission.create(userId, finalScore);

        res.status(201).json({ message: 'Submission created successfully', submission: newSubmission });
    } catch (error) {
        res.status(500).json({ message: 'Error creating submission', error: error.message });
    }
};

exports.getSubmissionsByUser = async (req, res) => {
    try {
        const userId = req.userData.userId;

        const submissions = await Submission.getByUserId(userId);

        res.status(200).json({ submissions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
};

exports.getSubmissionById = async (req, res) => {
    try {
        const submissionId = req.params.submissionId;
        const submission = await Submission.getById(submissionId);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json({ submission });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submission detail', error: error.message });
    }
};
