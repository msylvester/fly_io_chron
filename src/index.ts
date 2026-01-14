import express from 'express';
import sendRouter from './routes/send';
import { startCronJob } from './services/CronJob';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Email microservice is running' });
});

app.use('/send', sendRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Start cron job after server is running
  startCronJob(PORT);
});
