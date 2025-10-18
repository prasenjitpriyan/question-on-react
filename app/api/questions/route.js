import connectDB from '@/lib/mongodb';
import { QuestionValidationSchema } from '@/lib/validators/question';
import Question from '@/models/Question';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const validatedData = QuestionValidationSchema.parse(body);

    const newQuestion = await Question.create({
      ...validatedData,
      author: session.user.id,
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.flatten() },
        { status: 400 }
      );
    }
    console.error('Create Question Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const questions = await Question.find({}).sort({ createdAt: -1 });
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('Error fetching all questions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
