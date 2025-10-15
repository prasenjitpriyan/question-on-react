'use client';

import { AlertTriangle, X } from 'lucide-react';

export default function DeleteModal({ question, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-card rounded-xl p-6 max-w-md w-full relative">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-red-500/20">
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">Delete Question</h2>
        </div>

        <p className="text-white/70 mb-2">
          Are you sure you want to delete this question?
        </p>
        <p className="text-white font-medium mb-6 bg-white/5 p-3 rounded-lg">
          "{question?.question}"
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="btn-glass flex-1 h-10 rounded-lg text-white font-medium cursor-pointer hover:scale-105 active:scale-95 transition-all">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500/80 hover:bg-red-500 flex-1 h-10 rounded-lg text-white font-medium cursor-pointer hover:scale-105 active:scale-95 transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
