import mongoose from 'mongoose';

const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['paragraph', 'heading', 'code', 'example', 'list'],
    required: true,
  },
  value: {
    type: String,
    required: function () {
      return !['list'].includes(this.type);
    },
  },
  language: String,
  level: Number,
  items: [String],
});

ContentBlockSchema.add({ blocks: [ContentBlockSchema] });

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [String],
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy',
    },
    answerContent: {
      type: [ContentBlockSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model('Question', QuestionSchema);
