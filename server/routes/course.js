import express from 'express';

const router = express.Router();

// Middleware
import { requireSignIn, isInstructor } from './../middlewares';

// Controllers
import { uploadImage, removeImage, create, read } from './../controllers/course';

router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);
router.post('/course', requireSignIn, isInstructor, create);
router.get('/course/:slug', read);

module.exports = router;
