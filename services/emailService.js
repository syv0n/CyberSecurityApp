const nodemailer = require('nodemailer');

function createTransporter() {
    return nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SENDER_USER,
            pass: process.env.SENDER_PASSWORD 
        }
    });
}

module.exports = { createTransporter}


exports.sendVerificationEmail = async (email, token) => {
    // Ensure transporter is created before sending email
    if (!transporter) {
        createTransporter();
    }

    const verificationLink = `http://localhost:9009/verify-email.html?token=${token}`;

    const mailOptions = {
        from: 'CyberPal <sivashashank7@gmail.com>', // Use the authenticated email address
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
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

exports.sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `http://localhost:9009/verify-email.html?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>
             <p>If you didn't request this, please ignore this email.</p>`
    };
  
    await transporter.sendMail(mailOptions);
  };


