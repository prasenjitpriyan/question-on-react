'use client';

import AdminDashboardLayout from '@/components/admin/dashboard-layout';
import DeleteModal from '@/components/admin/delete-modal';
import QuestionCard from '@/components/admin/question-card';
import QuestionForm from '@/components/admin/question-form';
import ProtectedRoute from '@/components/protected-route';
import { useQuestions } from '@/lib/questions-context';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboard() {
  const { questions, updateQuestion, deleteQuestion } = useQuestions();
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletingQuestion, setDeletingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  const handleEdit = (question) => {
    setEditingQuestion(question);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = (formData) => {
    updateQuestion(editingQuestion.id, formData);
    setEditingQuestion(null);
  };

  const handleDelete = (id) => {
    const question = questions.find((q) => q.id === id);
    setDeletingQuestion(question);
  };

  const confirmDelete = () => {
    deleteQuestion(deletingQuestion.id);
    setDeletingQuestion(null);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === 'All' || q.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <ProtectedRoute requireAdmin>
      <AdminDashboardLayout>
        {editingQuestion && (
          <div className="mb-6">
            <QuestionForm
              question={editingQuestion}
              onSubmit={handleUpdate}
              onCancel={() => setEditingQuestion(null)}
            />
          </div>
        )}

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                size={18}
              />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-glass text-white w-full pl-10"
              />
            </div>
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                size={18}
              />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="input-glass text-white pl-10 pr-4 cursor-pointer">
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            All Questions ({filteredQuestions.length})
          </h2>
        </div>

        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <p className="text-white/60">No questions found</p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={(q) => console.log('View:', q)}
              />
            ))
          )}
        </div>

        {deletingQuestion && (
          <DeleteModal
            question={deletingQuestion}
            onConfirm={confirmDelete}
            onCancel={() => setDeletingQuestion(null)}
          />
        )}
      </AdminDashboardLayout>
    </ProtectedRoute>
  );
}
