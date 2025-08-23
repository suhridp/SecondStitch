import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
}) {
  const from = process.env.EMAIL_FROM!;
  try {
    await resend.emails.send({
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
  } catch (e) {
    console.error("Email send failed:", e);
  }
}
