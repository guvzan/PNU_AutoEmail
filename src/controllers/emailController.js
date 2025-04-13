import xlsx from 'xlsx';


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
    res.json({ rows: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to process file: ${err}`
    });
  }
}

export {
  getUploadPage,
  postUploadExcelFile
}