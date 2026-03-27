import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { userAgent, language, time, url } = await req.json();

    // Vercel Headers
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr') || 'Unknown IP';
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown Country';
    const city = req.headers.get('x-vercel-ip-city') || 'Unknown City';

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.error("Missing SMTP credentials in .env.local");
      return NextResponse.json({ success: false, error: 'Misconfigured server config.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: `"Portfolio Monitor" <${user}>`,
      to: user,
      subject: `🚨 Portfolio Visitor: ${city !== 'Unknown City' ? city : 'New Visit'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #10b981;">New Portfolio Visitor!</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(time).toUTCString()}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>IP Address:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${ip}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${city}, ${country}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Browser:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${language}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>URL:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${url}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Device:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${userAgent}</td></tr>
          </table>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Notification sent.' });

  } catch (error: any) {
    console.error('Email Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'Unknown error',
      code: error?.code || 'UNKNOWN'
    }, { status: 500 });
  }
}
