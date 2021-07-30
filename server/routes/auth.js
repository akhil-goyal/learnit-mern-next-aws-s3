import express from 'express';

const router = express.Router();

// Controllers
import { register } from './../controllers/auth';

router.get('/register', register);

module.exports = router;
