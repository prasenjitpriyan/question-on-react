'use client';

import AdminDashboardLayout from '@/components/admin/dashboard-layout';
import QuestionForm from '@/components/admin/question-form';
import ProtectedRoute from '@/components/protected-route';
import { useQuestions } from '@/lib/questions-context';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddQuestionPage() {
  const { addQuestion } = useQuestions();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (formData) => {
    addQuestion(formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.push('/admin/dashboard');
    }, 2000);
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

        <QuestionForm onSubmit={handleSubmit} />
      </AdminDashboardLayout>
    </ProtectedRoute>
  );
}
