'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ContentBlockRenderer } from '../shared/content-block-renderer';

export default function QuestionCard({ question, onEdit, onDelete, onView }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const { title, difficulty, category, tags, answerContent, createdAt, slug } =
    question;

  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-300 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Hard: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  return (
    <div className="glass-card rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-white/20 border border-transparent">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap',
                difficultyColors[difficulty] || difficultyColors.Medium
              )}>
              {difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 whitespace-nowrap">
              {category}
            </span>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 items-center">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs bg-gray-600/30 text-gray-400 whitespace-nowrap">
                    #{tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-xs text-gray-500">...</span>
                )}
              </div>
            )}
          </div>
          <h3
            className="text-lg font-semibold text-white mb-2 truncate"
            title={title}>
            {title}
          </h3>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-2 cursor-pointer font-medium"
            aria-label="Toggle Answer Visibility"
            aria-expanded={showAnswer}>
            {showAnswer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          {showAnswer && (
            <div className="text-white/80 text-sm bg-black/20 p-3 rounded-lg border border-white/10 mt-2 prose prose-sm prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0">
              {answerContent.map((block, index) => (
                <ContentBlockRenderer key={index} block={block} />
              ))}
            </div>
          )}
          <p className="text-xs text-white/40 mt-3">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(question)}
            title="Edit Question"
            className="btn-glass flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95 transition-transform">
            <Pencil size={16} />
            <span className="text-sm hidden md:inline">Edit</span>
          </button>
          <button
            onClick={() => onDelete(question)}
            title="Delete Question"
            className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-red-300 cursor-pointer hover:scale-105 active:scale-95 transition-all">
            <Trash2 size={16} />
            <span className="text-sm hidden md:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
