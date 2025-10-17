import mongoose from 'mongoose';

const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['paragraph', 'heading', 'code', 'image', 'example'],
    required: true,
  },
  value: {
    type: String,
    required: function () {
      return this.type !== 'image';
    },
  },
  alt: String,
  caption: String,
  language: String,
  level: Number,
  blocks: [this],
});

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

    answerContent: {
      type: [ContentBlockSchema],
      required: true,
    },
    mainImage: String,
  },
  { timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model('Question', QuestionSchema);
