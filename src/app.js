import express from 'express';
import 'dotenv/config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import emailRouter from './routes/emailRouter.js';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Parse JSON bodies for requests where Content-Type is application/json
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
app.use('/email', emailRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Page not found!'
  });
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})