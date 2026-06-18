import { NextResponse } from 'next/server';
import { getContactRecipient, sendEmail } from '@/lib/email-service';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
  const cleaned = phone.replace(/[\s-()]/g, '');
  return phoneRegex.test(cleaned) && cleaned.length >= 8 && cleaned.length <= 15;
}

function validateContact(contact: string): { valid: boolean; type: 'email' | 'phone' | null } {
  const trimmed = contact.trim();
  if (isValidEmail(trimmed)) return { valid: true, type: 'email' };
  if (isValidPhone(trimmed)) return { valid: true, type: 'phone' };
  return { valid: false, type: null };
}

function formatEmailContent(data: {
  language: string;
  service: string;
  details: string;
  contact: string;
  contactType: 'email' | 'phone';
}) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  const subject = `New Chatbot Lead — ${data.service}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#fff;padding:20px;border-radius:8px 8px 0 0">
        <h2 style="margin:0">New Chatbot Lead</h2>
      </div>
      <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb">
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Details:</strong> ${data.details || 'No details provided'}</p>
        <p><strong>Contact (${data.contactType}):</strong> ${data.contact}</p>
        <p><strong>Language:</strong> ${data.language === 'ar' ? 'Arabic' : 'English'}</p>
        <p style="color:#6b7280;font-size:12px">${timestamp}</p>
      </div>
    </div>
  `;
  const text = [
    'New Chatbot Lead',
    '',
    `Service: ${data.service}`,
    `Details: ${data.details || 'No details provided'}`,
    `Contact (${data.contactType}): ${data.contact}`,
    `Language: ${data.language === 'ar' ? 'Arabic' : 'English'}`,
    `Submitted: ${timestamp}`,
  ].join('\n');

  return { subject, html, text };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { language, service, details, contact } = body;

    if (!service || typeof service !== 'string' || service.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Service selection is required' },
        { status: 400 }
      );
    }

    if (!details || typeof details !== 'string' || details.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Project details must be at least 10 characters' },
        { status: 400 }
      );
    }

    if (!contact || typeof contact !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Contact information is required' },
        { status: 400 }
      );
    }

    const contactValidation = validateContact(contact);
    if (!contactValidation.valid) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address or phone number' },
        { status: 400 }
      );
    }

    const emailData = {
      language: language || 'en',
      service: service.trim(),
      details: details.trim(),
      contact: contact.trim(),
      contactType: contactValidation.type!,
    };

    const to = getContactRecipient();
    if (!to) {
      return NextResponse.json(
        { success: false, message: 'Email is not configured on the server' },
        { status: 503 }
      );
    }

    const emailContent = formatEmailContent(emailData);
    const result = await sendEmail({
      to,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      replyTo: emailData.contactType === 'email' ? emailData.contact : undefined,
    });

    if (!result.sent) {
      return NextResponse.json(
        { success: false, message: 'SMTP is not configured' },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, message: 'Lead sent successfully' });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
