import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// Middleware
import { requireSignIn, isInstructor } from './../middlewares';

// Controllers
import { uploadImage, removeImage, create, read, uploadVideo } from './../controllers/course';

router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);
router.post('/course', requireSignIn, isInstructor, create);
router.get('/course/:slug', read);
router.post('/course/video-upload', requireSignIn, formidable(), uploadVideo);

module.exports = router;
