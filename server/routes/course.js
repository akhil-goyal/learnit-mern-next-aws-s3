import express from 'express';

const router = express.Router();

// Middleware
import { requireSignIn } from './../middlewares';

// Controllers
import { uploadImage } from './../controllers/course';

router.post('/course/upload-image', uploadImage);

module.exports = router;
