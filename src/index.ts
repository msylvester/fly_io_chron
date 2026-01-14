import express from 'express';
import sendRouter from './routes/send';
import adminRouter from './routes/admin';
import { startCronJob } from './services/CronJob';
import logger from './utils/logger';

logger.info({
  nodeVersion: process.version,
  env: process.env.NODE_ENV || 'development',
}, 'Application starting');

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
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server started');

  const task = startCronJob(PORT);
  logger.info({ cronStarted: !!task }, 'Cron job initialization complete');
});
