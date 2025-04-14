import xlsx from 'xlsx';
import { validateInputData } from '../utils/emailUtils.js';


const getUploadPage = (req, res) => {
  res.render('upload-file');
}

const postUploadExcelFile = (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    const validData = validateInputData(data);
    res.render('show-data', { rows: validData });
    // res.json({rows: validData});
  } catch (err) {
    res.status(500).render('excel_table', {
      rows: [],
      error: `Failed to process file: ${err.message}`
    });
  }
}

const postSendEmails = (req, res) => {
  const rows = JSON.parse(req.body.rows);
  res.json({
    rows
  });
}

export {
  getUploadPage,
  postUploadExcelFile,
  postSendEmails
}