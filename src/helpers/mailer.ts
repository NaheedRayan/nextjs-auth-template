import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';


export const sendEmail = async (email: string, emailType: string, userId: string) => {

    try {

        // create a uuid token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // save the hashed token in the database
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `
            <p>Click the link below to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}</p>
            <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}">Click here</a>

            <br>
            <br>
            or copy and paste the link below in your browser
            <br>
            ${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}
            `
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    }
    catch (error) {
        console.log(error);
    }
};