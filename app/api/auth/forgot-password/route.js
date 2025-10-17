import { sendEmail } from '@/lib/mailer';
import connectDB from '@/lib/mongodb';
import { ForgotPasswordSchema } from '@/lib/validators/user';
import User from '@/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email } = ForgotPasswordSchema.parse(body);

    const user = await User.findOne({ email });
    if (!user) {
      // Generic response to prevent user enumeration
      return NextResponse.json({
        message:
          'If an account with this email exists, a password reset link has been sent.',
      });
    }

    // Generate reset token & expiration
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;
    await user.save();

    // Construct reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // Email HTML template
    const html = `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.firstname || ''},</p>
      <p>You are receiving this email because a password reset was requested for your account.</p>
      <p><a href="${resetUrl}" target="_blank" style="color:#007bff;">Reset Your Password</a></p>
      <p>This link will expire in 10 minutes. If you didn’t request this, please ignore this email.</p>
    `;

    // Send email using mailer utility
    const emailResult = await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html,
    });

    if (!emailResult.success) {
      throw new Error(emailResult.error || 'Failed to send reset email');
    }

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

    console.error('❌ Forgot Password Error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred' },
      { status: 500 }
    );
  }
}
