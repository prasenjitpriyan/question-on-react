'use client';

import AdminDashboardLayout from '@/components/admin/dashboard-layout';
import QuestionForm from '@/components/admin/question-form';
import ProtectedRoute from '@/components/protected-route';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddQuestionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.details?.fieldErrors?.slug?.[0] ||
          data.error ||
          'Failed to create question';
        throw new Error(errorMessage);
      }
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminDashboardLayout>
        {showSuccess && (
          <div className="glass-card rounded-xl p-4 mb-6 flex items-center gap-3 bg-green-500/20 border-green-500/30">
            <CheckCircle className="text-green-400" size={24} />
            <p className="text-white font-medium">
              Question added successfully!
            </p>
          </div>
        )}

        {error && (
          <div className="glass-card rounded-xl p-4 mb-6 flex items-center gap-3 bg-red-500/20 border-red-500/30">
            <AlertCircle className="text-red-400" size={24} />
            <p className="text-white font-medium">{error}</p>
          </div>
        )}
        <QuestionForm onSubmit={handleSubmit} isSubmitting={loading} />
      </AdminDashboardLayout>
    </ProtectedRoute>
  );
}
