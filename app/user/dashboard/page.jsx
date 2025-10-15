'use client';

import ProtectedRoute from '@/components/protected-route';
import UserDashboardLayout from '@/components/user/dashboard-layout';
import QuestionViewer from '@/components/user/question-viewer';
import { useQuestions } from '@/lib/questions-context';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

export default function UserDashboard() {
  const { questions } = useQuestions();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(questions.map((q) => q.category))];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === 'All' || q.difficulty === filterDifficulty;
    const matchesCategory =
      filterCategory === 'All' || q.category === filterCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <ProtectedRoute>
      <UserDashboardLayout>
        {/* Filters */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  size={18}
                />
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="input-glass text-white w-full pl-10 pr-4 cursor-pointer">
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  size={18}
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="input-glass text-white w-full pl-10 pr-4 cursor-pointer">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white mb-1">
              {questions.length}
            </p>
            <p className="text-white/60 text-sm">Total Questions</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white mb-1">
              {filteredQuestions.length}
            </p>
            <p className="text-white/60 text-sm">Filtered Results</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white mb-1">
              {categories.length - 1}
            </p>
            <p className="text-white/60 text-sm">Categories</p>
          </div>
        </div>

        {/* Questions */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">
            Questions ({filteredQuestions.length})
          </h2>
        </div>

        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <p className="text-white/60">No questions found</p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionViewer key={question.id} question={question} />
            ))
          )}
        </div>
      </UserDashboardLayout>
    </ProtectedRoute>
  );
}
