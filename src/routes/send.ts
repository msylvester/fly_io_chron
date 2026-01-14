import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const timestamp = new Date().toISOString();
  console.log(`[CRON] Triggered at ${timestamp}`);

  res.json({
    success: true,
    message: 'Cron job executed',
    timestamp
  });
});

export default router;
