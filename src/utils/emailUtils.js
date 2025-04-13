import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {v4 as uuidv4} from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const originalName = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const fileExtension = path.extname(originalName).toLowerCase();
    if (fileExtension !== '.xlsx' && fileExtension !== '.xls') {
      cb(new Error('Invalid file type. Please upload an Excel file.'));
    } else {
      cb(null, uuidv4() + originalName);
    }
  },
});

const upload = multer({ storage: storage });

export { upload };
