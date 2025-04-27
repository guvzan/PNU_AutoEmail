import xlsx from 'xlsx';
import { validateInputData } from '../utils/emailUtils.js';
import { transporter } from '../utils/emailUtils.js';


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

const postSendEmails = async (req, res) => {
  try {
    const rows = JSON.parse(req.body.rows);
    const results = [];

    for (const row of rows) {
      if (row.errors && row.errors.length > 0) {
        results.push({
          email: row['e-mail'],
          status: 'skipped',
          reason: row.errors.join('; ')
        });
        continue;
      }



      const htmlBody = `
        <p>Шановний(а), ${row['ПІБ']}!</p>
      
        <p>
          Ми вдячні Вам, що ви зареєструвались для участі у бета-тестуванні<br>
          нової Системи дистанційного навчання. Надсилаємо Вам реєстраційні дані.<br>
          Ваш логін – <strong>${row['Логін']}</strong>, пароль – <strong>${row['Пароль']}</strong><br>
          та адреса для входу – <a href="http://194.44.152.161/">http://194.44.152.161/</a>.
        </p>
      
        <p>
          За цими реєстраційними даними Ви можете уже зараз зайти та<br>
          ознайомитись із Системою. Починаючи з наступного тижня (з 15 березня 2021 р.)<br>
          ми організуємо ряд навчальних он-лайн семінарів щодо роботи у новій Системі<br>
          та формату співпраці у межах тестування, про що повідомимо Вам окремо.<br>
          Інструкцію щодо роботи можна знайти за покликанням<br>
          <a href="http://ceeq.pnu.edu.ua">ceeq.pnu.edu.ua</a>.
        </p>
      
        <p>
          У разі виникнення питань просимо звертатись за адресою<br>
          <a href="mailto:dist@pnu.edu.ua">dist@pnu.edu.ua</a>
        </p>
      
        <p>
          З повагою,<br>
          Центр дистанційного навчання<br>
          та моніторингу освітньої діяльності
        </p>
      `;


      try {
        const info = await transporter.sendMail({
          from: `"PNU Авто-Листи" <${process.env.GMAIL_USER}>`,
          to: row['e-mail'],
          subject: 'Ваші дані для входу',
          html: htmlBody
        });
        results.push({ email: row['e-mail'], status: 'sent', messageId: info.messageId });
      } catch (sendErr) {
        results.push({
          email: row['e-mail'],
          status: 'failed',
          error: sendErr.message,
        });
      }
    }

    return res.render('results', { results });
  } catch (err) {
    console.error('Send emails error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export {
  getUploadPage,
  postUploadExcelFile,
  postSendEmails
}