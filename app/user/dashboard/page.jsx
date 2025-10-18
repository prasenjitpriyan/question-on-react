'use client';

import ProtectedRoute from '@/components/protected-route';
import UserDashboardLayout from '@/components/user/dashboard-layout';
import QuestionViewer from '@/components/user/question-viewer';
import { AlertCircle, Filter, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function UserDashboard() {
  // State for storing data fetched from the API
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  // Fetch all questions from the API when the component first loads
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/questions');
        if (!res.ok) {
          throw new Error('Failed to load questions. Please try again later.');
        }
        const data = await res.json();
        setAllQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const categories = useMemo(() => {
    if (!allQuestions) return ['All'];
    return ['All', ...new Set(allQuestions.map((q) => q.category))];
  }, [allQuestions]);

  const filteredQuestions = useMemo(() => {
    if (!allQuestions) return [];
    return allQuestions.filter((q) => {
      const matchesSearch = q.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === 'All' || q.category === filterCategory;
      const matchesDifficulty =
        filterDifficulty === 'All' || q.difficulty === filterDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [allQuestions, searchTerm, filterCategory, filterDifficulty]);

  if (loading) {
    return (
      <ProtectedRoute>
        <UserDashboardLayout>
          <div className="flex justify-center items-center h-96 text-white/80">
            <p className="text-lg">Loading questions...</p>
          </div>
        </UserDashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <UserDashboardLayout>
          <div className="flex flex-col justify-center items-center h-96 text-red-300 glass-card rounded-2xl p-8">
            <AlertCircle size={48} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">An Error Occurred</h3>
            <p>{error}</p>
          </div>
        </UserDashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <UserDashboardLayout>
        {/* Filters Section */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10"
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

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Difficulty Filter */}
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10"
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

              {/* Category Filter */}
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10"
                  size={18}
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="input-glass text-white w-full h-11 pl-10 pr-10 rounded-lg cursor-pointer appearance-none">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Categories' : cat}
                    </option>
                  ))}
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
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white mb-1">
              {allQuestions.length}
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

        {/* Questions List Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">
            Questions ({filteredQuestions.length})
          </h2>
        </div>

        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <p className="text-white/60">
                No questions found matching your criteria.
              </p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionViewer key={question._id} question={question} />
            ))
          )}
        </div>
      </UserDashboardLayout>
    </ProtectedRoute>
  );
}
