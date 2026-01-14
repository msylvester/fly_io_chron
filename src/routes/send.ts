import { Router, Request, Response } from 'express';
import logger from '../utils/logger';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const timestamp = new Date().toISOString();
  const { email } = req.body;

  logger.info({ email, endpoint: '/send' }, 'Send endpoint triggered');

  res.json({
    success: true,
    message: 'Cron job executed',
    timestamp
  });
});

export default router;
