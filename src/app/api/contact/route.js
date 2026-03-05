import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  return NextResponse.json([]);
}

export async function POST(request) {
  try {
    const { name, phone, email, subject, message } = await request.json();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone and message are required' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email 1 — Notify Admin
    await transporter.sendMail({
      from: `"VRIDE-CYCLES Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email || process.env.EMAIL_USER,
      subject: `[VRIDE-CYCLES] ${subject ? subject.toUpperCase() : 'New Enquiry'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f0f0f; color: #fff; border-radius: 12px;">
          <h2 style="color: #00d4ff; margin-bottom: 24px;">🚴 New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; width: 120px;">Name</td><td style="padding: 8px 0; color: #fff;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0; color: #fff;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0; color: #fff;">${email || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Subject</td><td style="padding: 8px 0; color: #fff;">${subject || 'Not selected'}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #1a1a1a; border-radius: 8px; border-left: 4px solid #00d4ff;">
            <p style="color: #999; margin: 0 0 8px;">Message:</p>
            <p style="color: #fff; margin: 0;">${message}</p>
          </div>
          <p style="color: #555; font-size: 12px; margin-top: 24px;">Sent from VRIDE-CYCLES website contact form</p>
        </div>
      `,
    });

    // ✅ Email 2 — Confirmation to User (only if email provided)
    if (email) {
      await transporter.sendMail({
        from: `"V Ride Cycles" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for contacting V Ride Cycles, ${name}! 🚴`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f0f0f; color: #fff; border-radius: 12px;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #00d4ff; font-size: 28px; margin: 0;">🚴 V Ride Cycles</h1>
              <p style="color: #666; margin: 4px 0 0;">Arundelpet, Guntur</p>
            </div>

            <!-- Greeting -->
            <h2 style="color: #fff; font-size: 20px; margin-bottom: 8px;">
              Hi ${name}! 👋
            </h2>
            <p style="color: #aaa; line-height: 1.6; margin-bottom: 24px;">
              Thank you for reaching out to us. We have received your message and our team will get back to you within <strong style="color: #00d4ff;">24 hours</strong>.
            </p>

            <!-- Your Message Summary -->
            <div style="background: #1a1a1a; border-radius: 10px; padding: 20px; margin-bottom: 24px; border: 1px solid #222;">
              <h3 style="color: #00d4ff; margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Message Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #666; width: 100px; font-size: 13px;">Subject</td><td style="padding: 6px 0; color: #fff; font-size: 13px;">${subject || 'General Enquiry'}</td></tr>
                <tr><td style="padding: 6px 0; color: #666; font-size: 13px;">Message</td><td style="padding: 6px 0; color: #ccc; font-size: 13px;">${message}</td></tr>
              </table>
            </div>

            <!-- Contact Info -->
            <div style="background: #1a1a1a; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
              <h3 style="color: #00d4ff; margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Need Immediate Help?</h3>
              <p style="margin: 0 0 8px;">
                <a href="tel:07386117144" style="color: #00d4ff; text-decoration: none;">📞 073861 17144</a>
              </p>
              <p style="margin: 0 0 8px;">
                <a href="https://wa.me/917386117144" style="color: #25d366; text-decoration: none;">💬 WhatsApp us</a>
              </p>
              <p style="margin: 0; color: #666; font-size: 13px;">🕐 Open Monday – Sunday: 9:00 AM – 9:00 PM</p>
            </div>

            <!-- CTA -->
            <div style="text-align: center; margin-bottom: 24px;">
              <a href="https://vridecycles.vercel.app/cycles"
                style="display: inline-block; background: linear-gradient(135deg, #00d4ff, #7c3aed); color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: bold; font-size: 15px;">
                Browse Our Cycles 🚴
              </a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; border-top: 1px solid #222; padding-top: 16px;">
              <p style="color: #444; font-size: 12px; margin: 0;">
                © 2026 V Ride Cycles | 10/1, 16th Line, Arundelpet, Guntur, AP 522002
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
