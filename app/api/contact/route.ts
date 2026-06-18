import { NextResponse } from 'next/server';
import { getContactRecipient, sendEmail } from '@/lib/email-service';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, website } = body;

    if (website) {
      return NextResponse.json({ success: true, message: 'Message sent' });
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please enter your name' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    const to = getContactRecipient();
    if (!to) {
      return NextResponse.json(
        { success: false, message: 'Email is not configured on the server' },
        { status: 503 }
      );
    }

    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
    });

    const subject = `Portfolio Contact — ${name.trim()}`;
    const text = [
      'New contact form message',
      '',
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      '',
      'Message:',
      message.trim(),
      '',
      `Submitted: ${timestamp}`,
    ].join('\n');

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#fff;padding:20px;border-radius:8px 8px 0 0">
          <h2 style="margin:0">New Portfolio Contact</h2>
        </div>
        <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb">
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#fff;padding:12px;border-left:3px solid #4F46E5">${message.trim().replace(/\n/g, '<br>')}</p>
          <p style="color:#6b7280;font-size:12px">${timestamp}</p>
        </div>
      </div>
    `;

    const result = await sendEmail({
      to,
      subject,
      html,
      text,
      replyTo: email.trim(),
    });

    if (!result.sent) {
      return NextResponse.json(
        { success: false, message: 'SMTP is not configured' },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
