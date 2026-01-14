import express from 'express';
import sendRouter from './routes/send';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Email microservice is running' });
});

app.use('/send', sendRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
