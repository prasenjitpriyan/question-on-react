'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function QuestionForm({ question, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    difficulty: 'Medium',
    category: '',
  });

  useEffect(() => {
    if (question) {
      setFormData({
        question: question.question,
        answer: question.answer,
        difficulty: question.difficulty,
        category: question.category,
      });
    }
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">
        {question ? 'Edit Question' : 'Add New Question'}
      </h2>

      <div className="space-y-4">
        <LabelInputContainer>
          <Label className="text-white/90 font-medium" htmlFor="question">
            Question
          </Label>
          <Input
            id="question"
            placeholder="Enter your question"
            type="text"
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            className="input-glass text-white"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label className="text-white/90 font-medium" htmlFor="answer">
            Answer
          </Label>
          <textarea
            id="answer"
            placeholder="Enter the answer"
            value={formData.answer}
            onChange={(e) =>
              setFormData({ ...formData, answer: e.target.value })
            }
            className="input-glass text-white min-h-[120px] resize-y"
            required
          />
        </LabelInputContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabelInputContainer>
            <Label className="text-white/90 font-medium" htmlFor="difficulty">
              Difficulty
            </Label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
              className="input-glass text-white h-10 cursor-pointer"
              required>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer>
            <Label className="text-white/90 font-medium" htmlFor="category">
              Category
            </Label>
            <Input
              id="category"
              placeholder="e.g., Hooks, State Management"
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="input-glass text-white"
              required
            />
          </LabelInputContainer>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="btn-glass flex-1 h-10 rounded-lg text-white font-medium cursor-pointer hover:scale-105 active:scale-95 transition-all">
          {question ? 'Update Question' : 'Add Question'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-white/10 hover:bg-white/20 border border-white/20 flex-1 h-10 rounded-lg text-white font-medium cursor-pointer hover:scale-105 active:scale-95 transition-all">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};
