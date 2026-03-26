import nodemailer from "nodemailer";

export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || '"UptoSkills AI" <no-reply@uptoskills.com>',
      to: email,
      subject: "Welcome to UptoSkills AI Resume Builder",
      text: "Congratulations! You have signed up for UptoSkills AI Resume Builder.",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <div style="margin: 0 auto 20px auto; width: 200px; height: 80px; background-image: url('https://raw.githubusercontent.com/Rahulnam30/AI-Resume-Builder/main/frontend/src/assets/logo6.png'); background-size: contain; background-repeat: no-repeat; background-position: center;" title="UptoSkills AI Resume Builder Logo"></div>
          <h2 style="color: #1a2e52;">Welcome to UptoSkills AI Resume Builder!</h2>
          <p style="font-size: 16px; color: #333;"><strong>Congratulations! You have signed up for UptoSkills AI Resume Builder.</strong></p>
          <p style="font-size: 14px; color: #555;">We are excited to help you empower your skills and build your dream career.</p>
          <br/>
          <p style="font-size: 14px; color: #777;">Best Regards,<br/><strong>The UptoSkills Team</strong></p>
        </div>
      `,
    };

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("⚠️ Email credentials missing in .env (EMAIL_USER, EMAIL_PASS). Email not actually sent.");
      return res.status(200).json({ message: "Subscription logic triggered, but email credentials missing." });
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Subscription successful, email sent!" });

  } catch (error) {
    console.error("Error sending newsletter email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
