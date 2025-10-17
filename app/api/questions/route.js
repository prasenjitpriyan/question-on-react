import connectDB from '@/lib/mongodb';
import { QuestionValidationSchema } from '@/lib/validators/question';
import Question from '@/models/Question';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const validatedData = QuestionValidationSchema.parse(body);
    const existingQuestion = await Question.findOne({
      $or: [{ title: validatedData.title }, { slug: validatedData.slug }],
    });
    if (existingQuestion) {
      return NextResponse.json(
        { error: 'A question with this title or slug already exists' },
        { status: 409 }
      );
    }

    const newQuestion = await Question.create(validatedData);

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
