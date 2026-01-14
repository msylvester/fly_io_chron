import { Router, Request, Response } from 'express';
import { SendMail } from '../services/SendMail';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const sendMail = new SendMail(email);
    await sendMail.send();

    res.json({ success: true, message: `Email sent to ${email}` });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
