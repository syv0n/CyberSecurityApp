const Submission = require('../models/Submissions');

const User = require('../models/User');



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




const { createTransporter } = require('../services/emailService');

exports.notifySubmission = async (req, res) => {
      try {

          let userEmail = req.userData.email; // Changed from const to let

          if (!userEmail) {
            // If email is not in req.userData, fetch it from the database
            let user = await User.findById(req.userData.userId);
            if (!user || !user.email) {
                throw new Error('User email not found');
            }
            userEmail = user.email;
        }

        console.log('User email:', userEmail);

          // Create a new transporter for this email
          let transporter = createTransporter();


      const mailOptions = {
          from: 'CyberPal <sivashashank7@gmail.com>',
          to: userEmail,
          subject: 'Cybersecurity Maturity Score Submitted',
          // text: 'Your final score has been successfully submitted. Please view submission details to print the report.',
          html: 
          `
          <h2>Final score submission is successful</h2>
          <p>Your final score has been successfully submitted and has been saved in the database.</p> 
          <p>Please visit submission history to print the report.</p>
          `
      };

      let info = await transporter.sendMail(mailOptions);
      console.log("Notification sent: %s", info.messageId);

      res.json({ message: 'Notification sent successfully' });
  } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Failed to send notification', details: error.message });
  }
  }
