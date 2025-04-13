import { Router } from 'express';
import { getUploadPage, postUploadExcelFile } from '../controllers/emailController.js';
import {upload} from '../utils/emailUtils.js';
import multer from 'multer';

const router = Router();

router.get('/', getUploadPage);
router.post('/upload', upload.single('excel'), postUploadExcelFile);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send({ message: 'Multer Error: ' + err.message });
  } else if (err) {
    res.status(400).send({ message: 'Error: ' + err.message });
  } else {
    next();
  }
});

export default router;