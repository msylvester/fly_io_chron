import * as postmark from 'postmark';

export class SendMail {
  private client: postmark.ServerClient;
  private email: string;

  constructor(email: string) {
    this.client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);
    this.email = email;
  }

  async send(): Promise<postmark.Models.MessageSendingResponse> {
    return this.client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL!,
      To: this.email,
      Subject: 'Hello from Fly.io Microservice',
      TextBody: 'This email was sent via the email microservice.',
    });
  }
}
