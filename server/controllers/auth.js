import User from './../models/user';
import { hashPassword, comparePassword } from './../utils/auth';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION
}

const SES = new AWS.SES(awsConfig);

export const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // User Validations
        if (!name) return res.status(400).send('Name is a required field.');

        if (!password || password.length < 6) {
            return res.status(400).send('Password is required & should be atleast 6 characters long.');
        }

        let userExist = await User.findOne({ email }).exec();

        if (userExist) res.status(400).send('This email address is already in use.');

        // Password Hashing
        const hashedPassword = await hashPassword(password);

        // Register
        const user = new User({
            name, email, password: hashedPassword
        });

        await user.save();

        console.log('Saved User : ', user);
        return res.json({ ok: true });

    } catch (err) {
        console.log(err);
        return res.status(400).send('Error! Try again...');
    }

}

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check if user email exists.
        const user = await User.findOne({ email }).exec();

        if (!user) return res.status(400).send('No user found for this email.');

        // Checking Password
        const match = await comparePassword(password, user.password);

        // Creating Signed JSON WEB TOKEN
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Return User data & Token to client-side. Exclude hashed password.
        user.password = undefined;

        // Sending token in cookie
        res.cookie('token', token, {
            httpOnly: true, // This will ensure that the cookie is not available via JavaScript on client-side.
            // secure: true // Secure: true works only with https
        });

        // Sending User data as JSON response.
        res.json(user);

    } catch (err) {
        console.log(err);
        return res.status(400).send('Error. Try Again!');
    }

}

export const logout = async (req, res) => {

    try {
        res.clearCookie('token');
        return res.json({ message: 'Signout Success' });
    } catch (err) {
        console.log(err);
    }

}

export const currentUser = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select('-password').exec();
        return res.json({ ok: true });

    } catch (err) {
        console.log(err);
    }

}

export const sendTestEmail = async (req, res) => {

    const params = {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: ['a4akhil.g4goyal@gmail.com']
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                    <html>
                        <h1>Reset Password Link</h1>
                        <p>Please use this link for password recovery - </p>
                    </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Password Reset Link'
            }
        }
    }

    const emailSent = SES.sendEmail(params).promise();

    emailSent.then((data) => {
        console.log(data);
        res.json({ ok: true });
    }).catch(err => {
        console.log(err);
    });

}