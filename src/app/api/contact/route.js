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

    await transporter.sendMail({
      from: `"VRIDE-CYCLES Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email || process.env.EMAIL_USER,
      subject: `[VRIDE-CYCLES] ${subject ? subject.toUpperCase() : 'New Enquiry'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f0f0f; color: #fff; border-radius: 12px;">
          <h2 style="color: #00d4ff; margin-bottom: 24px;">🚴 New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999;">Name</td><td style="padding: 8px 0; color: #fff;">${name}</td></tr>
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

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
