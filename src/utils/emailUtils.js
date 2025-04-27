import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {v4 as uuidv4} from 'uuid';
import {FIELDS} from '../Constants.js';
import nodemailer from 'nodemailer';

const {email, pib, login, password} = FIELDS;

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

const validateInputData = (rows) => {
  rows.errorCounter = 0;
  rows.forEach((row) => {
    row.errors = [];
    if(!row[email]){
      row.errors.push('Відсутній email');
      row[email] = 'N/A';
    }
    if(!row[pib]){
      row.errors.push('Відсутні ПІБ');
      row[pib] = 'N/A';
    }
    if(!row[login]){
      row.errors.push('Відсутній логін');
      row[login] = 'N/A';
    }
    if(!row[password]){
      row.errors.push('Відсутній пароль');
      row[password] = 'N/A';
    }
    if(row.errors.length) rows.errorCounter++;
  });
  console.log(rows);
  return rows;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  }
});

export {
  upload,
  validateInputData,
  transporter
};
