import express from 'express';

const router = express.Router();

// Middleware
import { requireSignIn } from './../middlewares';

// Controllers
import { register, login, logout, currentUser, sendTestEmail, forgotPassword, resetPassword } from './../controllers/auth';

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/current-user', requireSignIn, currentUser);
router.get('/send-email', sendTestEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);    

module.exports = router;
