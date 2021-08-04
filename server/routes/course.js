import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// Middleware
import { requireSignIn, isInstructor } from './../middlewares';

// Controllers
import { uploadImage, removeImage, create, read, uploadVideo, removeVideo, addLesson, update, removeLesson } from './../controllers/course';

router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);

router.post('/course', requireSignIn, isInstructor, create);
router.put('/course/:slug', requireSignIn, update);

router.get('/course/:slug', read);
router.post('/course/video-upload/:instructorId', requireSignIn, formidable(), uploadVideo);
router.post('/course/video-remove/:instructorId', requireSignIn, removeVideo);
router.post('/course/lesson/:slug/:instructorId', requireSignIn, addLesson);
router.put('/course/:slug/:lessonId', requireSignIn, removeLesson);

module.exports = router;
