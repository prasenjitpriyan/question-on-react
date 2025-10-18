'use client';

import AdminDashboardLayout from '@/components/admin/dashboard-layout';
import DeleteModal from '@/components/admin/delete-modal';
import QuestionCard from '@/components/admin/question-card';
import QuestionForm from '@/components/admin/question-form';
import ProtectedRoute from '@/components/protected-route';
import { AlertCircle, Filter, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function AdminDashboard() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletingQuestion, setDeletingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/questions');
      if (!res.ok) throw new Error('Failed to fetch questions');
      const data = await res.json();
      setAllQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleEdit = (question) => {
    setEditingQuestion(question);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (formData) => {
    if (!editingQuestion) return;
    try {
      const res = await fetch(`/api/questions/${editingQuestion.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update question');

      setEditingQuestion(null);
      await fetchQuestions();
    } catch (err) {
      console.error('Update Error:', err);
    }
  };

  const handleDelete = (question) => {
    setDeletingQuestion(question);
  };

  const confirmDelete = async () => {
    if (!deletingQuestion) return;
    try {
      const res = await fetch(`/api/questions/${deletingQuestion.slug}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete question');

      setDeletingQuestion(null);
      await fetchQuestions();
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchesSearch = q.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        filterDifficulty === 'All' || q.difficulty === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [allQuestions, searchTerm, filterDifficulty]);

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="text-center text-white py-10">Loading...</div>
      </AdminDashboardLayout>
    );
  }
  if (error) {
    return (
      <AdminDashboardLayout>
        <div className="text-center text-red-400 py-10 flex items-center justify-center gap-2">
          <AlertCircle /> {error}
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <AdminDashboardLayout>
        {editingQuestion && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Edit Question
            </h2>
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
                placeholder="Search questions by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-glass text-white w-full h-11 pl-10 pr-4 rounded-lg"
              />
            </div>
            <div className="relative md:w-56">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 z-10"
                size={18}
              />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="input-glass text-white w-full h-11 pl-10 pr-10 rounded-lg cursor-pointer appearance-none">
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
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
              <p className="text-white/60">No questions found.</p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question._id} // Use MongoDB _id
                question={question}
                onEdit={() => handleEdit(question)}
                onDelete={() => handleDelete(question)}
                onView={() => router.push(`/questions/${question.slug}`)}
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
