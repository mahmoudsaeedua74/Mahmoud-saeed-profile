import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Initialize Gmail transporter
const getTransporter = () => {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        return null;
    }
    
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER.trim(),
            pass: process.env.GMAIL_APP_PASSWORD.trim(),
        },
    });
};

/* -------------------------------------------------------------------------- */
/*                              VALIDATION HELPERS                            */
/* -------------------------------------------------------------------------- */

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
    // Accepts international format: +1234567890 or local: 05xxxxxxxx or 966xxxxxxxxx
    const phoneRegex = /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
    const cleaned = phone.replace(/[\s-()]/g, '');
    return phoneRegex.test(cleaned) && cleaned.length >= 8 && cleaned.length <= 15;
}

function validateContact(contact: string): { valid: boolean; type: 'email' | 'phone' | null } {
    const trimmed = contact.trim();
    if (isValidEmail(trimmed)) {
        return { valid: true, type: 'email' };
    }
    if (isValidPhone(trimmed)) {
        return { valid: true, type: 'phone' };
    }
    return { valid: false, type: null };
}

/* -------------------------------------------------------------------------- */
/*                              EMAIL TEMPLATE                                */
/* -------------------------------------------------------------------------- */

function formatEmailContent(data: {
    language: string;
    service: string;
    details: string;
    contact: string;
    contactType: 'email' | 'phone';
}): { subject: string; html: string; text: string } {
    const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'UTC',
        dateStyle: 'full',
        timeStyle: 'long'
    });

    const subject = `New Chatbot Lead – ${data.service}`;

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                .field { margin-bottom: 20px; }
                .label { font-weight: 600; color: #4F46E5; margin-bottom: 5px; display: block; }
                .value { color: #1f2937; background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #4F46E5; }
                .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2 style="margin: 0;">🎯 New Chatbot Lead</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <span class="label">Service Requested:</span>
                        <div class="value">${data.service}</div>
                    </div>
                    <div class="field">
                        <span class="label">Project Details:</span>
                        <div class="value">${data.details || 'No details provided'}</div>
                    </div>
                    <div class="field">
                        <span class="label">Customer Contact (${data.contactType}):</span>
                        <div class="value" style="font-size: 18px; font-weight: bold; color: #4F46E5;">${data.contact}</div>
                    </div>
                    <div class="field">
                        <span class="label">Preferred Language:</span>
                        <div class="value">${data.language === 'ar' ? 'العربية (Arabic)' : 'English'}</div>
                    </div>
                    <div class="field">
                        <span class="label">Submitted At:</span>
                        <div class="value">${timestamp}</div>
                    </div>
                </div>
                <div class="footer">
                    This lead was submitted through your portfolio chatbot.
                </div>
            </div>
        </body>
        </html>
    `;

    const text = `
New Chatbot Lead

Service: ${data.service}
Details: ${data.details || 'No details provided'}
Contact (${data.contactType}): ${data.contact}
Language: ${data.language === 'ar' ? 'Arabic' : 'English'}
Submitted: ${timestamp}
    `.trim();

    return { subject, html, text };
}

/* -------------------------------------------------------------------------- */
/*                              API HANDLER                                   */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { language, service, details, contact } = body;

        // Validation: Service
        if (!service || typeof service !== 'string' || service.trim().length === 0) {
            return NextResponse.json(
                { success: false, message: 'Service selection is required' },
                { status: 400 }
            );
        }

        // Validation: Details (minimum 10 characters)
        if (!details || typeof details !== 'string' || details.trim().length < 10) {
            return NextResponse.json(
                { success: false, message: 'Project details must be at least 10 characters' },
                { status: 400 }
            );
        }

        // Validation: Contact (email or phone)
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

        // Prepare email data
        const emailData = {
            language: language || 'en',
            service: service.trim(),
            details: details.trim(),
            contact: contact.trim(),
            contactType: contactValidation.type!
        };

        // Send email if Gmail is configured
        const transporter = getTransporter();
        
        if (transporter && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
            // Debug: Check credentials (without exposing password)
            console.log('📧 Attempting to send email...');
            console.log('📧 Gmail User:', process.env.GMAIL_USER);
            console.log('📧 Gmail User length:', process.env.GMAIL_USER.length, 'characters');
            console.log('📧 App Password length:', process.env.GMAIL_APP_PASSWORD.length, 'characters');
            console.log('📧 App Password has spaces:', process.env.GMAIL_APP_PASSWORD.includes(' ') ? 'YES ❌' : 'NO ✅');
            console.log('📧 App Password first char:', process.env.GMAIL_APP_PASSWORD[0]);
            console.log('📧 App Password last char:', process.env.GMAIL_APP_PASSWORD[process.env.GMAIL_APP_PASSWORD.length - 1]);
            
            // Verify App Password format (should be alphanumeric, 16 chars)
            const isValidFormat = /^[a-zA-Z0-9]{16}$/.test(process.env.GMAIL_APP_PASSWORD);
            console.log('📧 App Password format valid:', isValidFormat ? '✅' : '❌ (should be 16 alphanumeric characters)');
            
            try {
                // Test connection first
                await transporter.verify();
                console.log('✅ Gmail connection verified');
                
                const emailContent = formatEmailContent(emailData);
                
                const mailOptions = {
                    from: process.env.GMAIL_USER.trim(),
                    to: process.env.GMAIL_USER.trim(), // Send to your own email
                    subject: emailContent.subject,
                    html: emailContent.html,
                    text: emailContent.text,
                };

                await transporter.sendMail(mailOptions);
                console.log('✅ Email sent successfully to', process.env.GMAIL_USER);
                console.log('📧 Subject:', emailContent.subject);
            } catch (emailError: any) {
                console.error('❌ Email sending failed:');
                console.error('Error message:', emailError.message);
                console.error('Error code:', emailError.code);
                
                // Helpful error messages
                if (emailError.code === 'EAUTH') {
                    console.error('');
                    console.error('🔴 AUTHENTICATION ERROR - Detailed checks:');
                    console.error('   1. Verify App Password is from: https://myaccount.google.com/apppasswords');
                    console.error('   2. Make sure 2-Step Verification is ENABLED');
                    console.error('   3. App Password should be exactly 16 alphanumeric characters');
                    console.error('   4. Check .env.local file - no quotes, no spaces around =');
                    console.error('   5. Try creating a COMPLETELY NEW App Password');
                    console.error('   6. Wait 2-3 minutes after creating App Password before testing');
                    console.error('');
                    console.error('💡 TROUBLESHOOTING:');
                    console.error('   - Open .env.local and verify the password matches exactly');
                    console.error('   - Make sure there are no hidden characters');
                    console.error('   - Try copying the App Password again from Google');
                    console.error('');
                }
            }
        } else {
            // Fallback: Log to console if email is not configured
            console.log('⚠️ --- NEW LEAD RECEIVED (Email not configured) ---');
            console.log('❌ GMAIL_USER:', process.env.GMAIL_USER ? '✅ Set' : '❌ Missing');
            console.log('❌ GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✅ Set' : '❌ Missing');
            console.log('📝 Lead Details:');
            console.log('   Language:', emailData.language);
            console.log('   Service:', emailData.service);
            console.log('   Details:', emailData.details);
            console.log('   Contact:', emailData.contact);
            console.log('   Contact Type:', emailData.contactType);
            console.log('-----------------------------------------------');
            console.log('💡 To fix: Create .env.local with GMAIL_USER and GMAIL_APP_PASSWORD');
        }

        return NextResponse.json({
            success: true,
            message: 'Lead sent successfully'
        });

    } catch (error) {
        console.error('API Error:', error);
        
        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { success: false, message: 'Invalid request format' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
}
