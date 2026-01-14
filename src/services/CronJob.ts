import cron from 'node-cron';

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

  console.log(`[Cron] Sending email request to ${email}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`[Cron] Email sent successfully:`, data);
    } else {
      console.error(`[Cron] Failed to send email:`, data);
    }
  } catch (error) {
    console.error(`[Cron] Error sending email request:`, error);
  }
}

export function startCronJob(port: number | string): cron.ScheduledTask {
  // Run every 10 seconds: "*/10 * * * * *" (6 fields for seconds)
  const task = cron.schedule('*/10 * * * * *', () => {
    console.log(`[Cron] Running scheduled email job at ${new Date().toISOString()}`);
    sendEmailRequest(port);
  });

  console.log('[Cron] Email cron job scheduled to run every 10 seconds');

  return task;
}
