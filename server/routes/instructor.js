import express from 'express';

const router = express.Router();

// Middleware
import { requireSignIn } from './../middlewares';

// Controllers
import { makeInstructor } from './../controllers/instructor';

router.post('/make-instructor', requireSignIn, makeInstructor);

module.exports = router;
