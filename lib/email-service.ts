import nodemailer from 'nodemailer';

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;

  const secure = port === 465;
  const isDev = process.env.NODE_ENV === 'development';
  const wantStrict = process.env.SMTP_TLS_STRICT === '1';
  const forceInsecure = process.env.SMTP_TLS_INSECURE === '1';
  const skipTlsVerify = forceInsecure || (isDev && !wantStrict);

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    requireTLS: !secure,
    tls: {
      servername: host,
      ...(skipTlsVerify ? { rejectUnauthorized: false } : {}),
    },
  });
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const transport = getTransport();
  if (!transport) return { sent: false, reason: 'smtp-not-configured' as const };

  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  await transport.sendMail({
    from,
    to: input.to,
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });

  return { sent: true as const };
}

export function isSmtpConfigured(): boolean {
  return getTransport() != null;
}

export function getContactRecipient(): string | null {
  return (
    process.env.CONTACT_EMAIL_TO ||
    process.env.REPORT_EMAIL_TO ||
    process.env.SMTP_USER ||
    null
  );
}
