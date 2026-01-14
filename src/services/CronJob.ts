import cron from 'node-cron';
import logger from '../utils/logger';

const DOMAINS = [
  'example.com',
  'test.com',
  'demo.org',
  'sample.net',
  'mailinator.com',
];

const NAMES = [
  'john', 'jane', 'bob', 'alice', 'charlie',
  'david', 'emma', 'frank', 'grace', 'henry',
];

function generateRandomEmail(): string {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${name}${randomNum}@${domain}`;
}

async function sendEmailRequest(port: number | string): Promise<void> {
  const email = generateRandomEmail();
  const url = `http://localhost:${port}/send`;
  const startTime = Date.now();

  logger.info({ to: email }, 'Sending email request');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    const durationMs = Date.now() - startTime;

    if (response.ok) {
      logger.info({ to: email, durationMs, response: data }, 'Email sent successfully');
    } else {
      logger.error({ to: email, durationMs, response: data, statusCode: response.status }, 'Failed to send email');
    }
  } catch (error) {
    logger.error({ to: email, err: error }, 'Error sending email request');
  }
}

export function startCronJob(port: number | string): cron.ScheduledTask {
  const schedule = '*/10 * * * * *';

  const task = cron.schedule(schedule, () => {
    logger.debug({ schedule }, 'Cron job triggered');
    sendEmailRequest(port);
  });

  logger.info({ schedule, intervalSeconds: 10 }, 'Cron job scheduled');

  return task;
}
