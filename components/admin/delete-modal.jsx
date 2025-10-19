'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function DeleteModal({
  question,
  onConfirm,
  onCancel,
  isDeleting,
}) {
  const cancelButtonRef = useRef(null);
  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card rounded-xl p-6 w-full max-w-md relative border border-white/10 shadow-xl">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="absolute right-3 top-3 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          aria-label="Close confirmation">
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <h2 id="delete-modal-title" className="text-xl font-bold text-white">
            Confirm Deletion
          </h2>
        </div>
        <p className="text-white/80 mb-2 text-sm leading-relaxed">
          Are you absolutely sure you want to delete this question?
        </p>
        <p className="text-white font-medium mb-1 break-words bg-black/20 p-3 rounded-md border border-white/10 text-sm">
          {question?.title}
        </p>
        <p className="text-xs text-red-300/80 mb-6 px-1">
          This action cannot be undone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            ref={cancelButtonRef}
            onClick={onCancel}
            disabled={isDeleting}
            className="btn-secondary flex-1 h-10 rounded-lg text-white font-medium cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-800/50 disabled:cursor-not-allowed flex-1 h-10 rounded-lg text-white font-medium cursor-pointer transition-colors order-1 sm:order-2">
            {isDeleting ? 'Deleting...' : 'Yes, Delete'}{' '}
          </button>
        </div>
      </div>
    </div>
  );
}
