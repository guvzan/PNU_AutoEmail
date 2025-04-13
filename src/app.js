import express from 'express';
import 'dotenv/config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import emailRouter from './routes/emailRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/email', emailRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Page not found!'
  });
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})