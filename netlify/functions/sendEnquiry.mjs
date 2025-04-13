import { Resend } from 'resend';

const resend = new Resend('re_HHxdwjy6_7Xma6aTk7GX3Vq55KKMGtFsM');

export async function handler(event) {
  const { name, phone, email, message } = JSON.parse(event.body || '{}');

  try {
    await resend.emails.send({
      from: 'Sevenstar Travels <onboarding@resend.dev>',
      to: email,
      bcc: ['fighterplayz0@gmail.com'],
      subject: 'Thanks for your enquiry!',
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting Sevenstar Travelling Pvt. Ltd.</p>
        <p>We received the following details:</p>
        <ul>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>We'll get back to you shortly!</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
