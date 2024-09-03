const nodemailer = require('nodemailer');

let transporter;

function createTransporter() {
    transporter = nodemailer.createTransport({
        host: "",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SENDER_USER ,
            pass: process.env.SENDER_PASSWORD 
        }
    });
}

// Call createTransporter immediately
createTransporter();

exports.sendVerificationEmail = async (email, token) => {
    // Ensure transporter is created before sending email
    if (!transporter) {
        createTransporter();
    }

    const verificationLink = `http://localhost:9009/verify-email.html?token=${token}`;

    const mailOptions = {
        from: 'CyberPal <cyberpal@tcrest.com>', // Use the authenticated email address
        to: email,
        subject: 'CyberPal - Verify your email',
        html: `
            <h1>Welcome to CyberPal!</h1>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p>If you didn't request this verification, please ignore this email.</p>
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};