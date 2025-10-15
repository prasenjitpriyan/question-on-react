'use client';

import { cn } from '@/lib/utils';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function QuestionCard({ question, onEdit, onDelete, onView }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-300 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Hard: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  return (
    <div className="glass-card rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium border',
                difficultyColors[question.difficulty] || difficultyColors.Medium
              )}>
              {question.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {question.category}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">
            {question.question}
          </h3>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-sm text-white/70 hover:text-white transition-colors mb-2">
            {showAnswer ? 'Hide Answer' : 'Show Answer'} →
          </button>

          {showAnswer && (
            <p className="text-white/80 text-sm bg-white/5 p-3 rounded-lg border border-white/10 mt-2">
              {question.answer}
            </p>
          )}

          <p className="text-xs text-white/40 mt-3">
            Created: {new Date(question.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex md:flex-col gap-2">
          <button
            onClick={() => onView(question)}
            className="btn-glass flex items-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95">
            <Eye size={16} />
            <span className="text-sm">View</span>
          </button>
          <button
            onClick={() => onEdit(question)}
            className="btn-glass flex items-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95">
            <Pencil size={16} />
            <span className="text-sm">Edit</span>
          </button>
          <button
            onClick={() => onDelete(question.id)}
            className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 flex items-center gap-2 px-3 py-2 rounded-lg text-red-300 cursor-pointer hover:scale-105 active:scale-95 transition-all">
            <Trash2 size={16} />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
