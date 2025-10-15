import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
    },
    difficulty: {
      type: String,
      enum: ['EASY', 'MEDIUM', 'HARD'],
      default: 'MEDIUM',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

QuestionSchema.index({ difficulty: 1 });
QuestionSchema.index({ category: 1 });
QuestionSchema.index({ createdAt: -1 });
QuestionSchema.index({ tags: 1 });

export default mongoose.models.Question ||
  mongoose.model('Question', QuestionSchema);
