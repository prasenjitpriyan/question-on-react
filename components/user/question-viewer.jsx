'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function QuestionViewer({ question }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-300 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Hard: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  return (
    <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]">
      <div className="flex flex-wrap items-center gap-2 mb-4">
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

      <h3 className="text-xl font-semibold text-white mb-4">
        {question.question}
      </h3>

      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="btn-glass flex items-center gap-2 px-4 py-2 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95 transition-all mb-4">
        {showAnswer ? (
          <>
            <ChevronUp size={18} />
            Hide Answer
          </>
        ) : (
          <>
            <ChevronDown size={18} />
            Show Answer
          </>
        )}
      </button>

      {showAnswer && (
        <div className="bg-white/5 p-4 rounded-lg border border-white/10 animate-in fade-in duration-300">
          <p className="text-white/90 leading-relaxed">{question.answer}</p>
        </div>
      )}
    </div>
  );
}
