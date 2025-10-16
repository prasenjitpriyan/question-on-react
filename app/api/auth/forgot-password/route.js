import connectDB from '@/lib/mongodb';
import { ForgotPasswordSchema } from '@/lib/validators/user';
import User from '@/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ZodError } from 'zod';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email } = ForgotPasswordSchema.parse(body);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message:
          'If an account with this email exists, a password reset link has been sent.',
      });
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const passwordResetExpires = Date.now() + 10 * 60 * 1000;

    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;
    await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    const emailBody = `
      <h1>Password Reset Request</h1>
      <p>You are receiving this email because a password reset was requested for your account.</p>
      <p>Please click the link below to reset your password. This link will expire in 10 minutes.</p>
      <a href="${resetUrl}" target="_blank">Reset Your Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: emailBody,
    });

    return NextResponse.json({
      message:
        'If an account with this email exists, a password reset link has been sent.',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error('Forgot Password Error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred' },
      { status: 500 }
    );
  }
}
