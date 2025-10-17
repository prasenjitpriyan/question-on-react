import connectDB from '@/lib/mongodb';
import { UpdateQuestionValidationSchema } from '@/lib/validators/question';
import Question from '@/models/Question';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slug } = params;
    const question = await Question.findOne({ slug });

    if (!question) {
      return NextResponse.json(
        { message: 'Question not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { slug } = params;
    const body = await req.json();

    const validatedData = UpdateQuestionValidationSchema.parse(body);

    const updatedQuestion = await Question.findOneAndUpdate(
      { slug },
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return NextResponse.json(
        { message: 'Question not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.flatten() },
        { status: 400 }
      );
    }
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A question with this title or slug already exists' },
        { status: 409 }
      );
    }
    console.error('Update Question Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { slug } = params;

    const deletedQuestion = await Question.findOneAndDelete({ slug });

    if (!deletedQuestion) {
      return NextResponse.json(
        { message: 'Question not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Question deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete Question Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
