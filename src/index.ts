import express from 'express';
import sendRouter from './routes/send';
import { startCronJob } from './services/CronJob';

console.log('=== APPLICATION STARTING ===');
console.log(`Node version: ${process.version}`);
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Email microservice is running' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use('/send', sendRouter);

app.listen(PORT, () => {
  console.log('=== SERVER STARTED ===');
  console.log(`Server running on port ${PORT}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);

  // Start cron job after server is running
  console.log('Starting cron job...');
  const task = startCronJob(PORT);
  console.log('Cron job started:', task ? 'SUCCESS' : 'FAILED');
});
