import express from 'express';

const router = express.Router();

// Middleware
import { requireSignIn } from './../middlewares';

// Controllers
import { makeInstructor, getAccountStatus, currentInstructor, instructorCourses } from './../controllers/instructor';

router.post('/make-instructor', requireSignIn, makeInstructor);
router.post('/get-account-status', requireSignIn, getAccountStatus);
router.get('/current-instructor', requireSignIn, currentInstructor);
router.get('/instructor-courses', requireSignIn, instructorCourses);

module.exports = router;
