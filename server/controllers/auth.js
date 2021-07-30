import User from './../models/user';
import { hashPassword, comparePassword } from './../utils/auth';

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