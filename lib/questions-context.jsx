'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const QuestionsContext = createContext({});

export const useQuestions = () => useContext(QuestionsContext);

// Mock initial questions
const initialQuestions = [
  {
    id: 1,
    question: 'What is React?',
    answer:
      'React is a JavaScript library for building user interfaces, maintained by Facebook and a community of developers.',
    difficulty: 'Easy',
    category: 'Basics',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 2,
    question: 'What are React Hooks?',
    answer:
      'Hooks are functions that let you use state and other React features without writing a class. Common hooks include useState, useEffect, useContext, and useReducer.',
    difficulty: 'Medium',
    category: 'Hooks',
    createdAt: new Date('2024-01-02').toISOString(),
  },
  {
    id: 3,
    question: 'What is the Virtual DOM?',
    answer:
      'The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize updates. React compares the virtual DOM with the real DOM and only updates what changed.',
    difficulty: 'Medium',
    category: 'Core Concepts',
    createdAt: new Date('2024-01-03').toISOString(),
  },
  {
    id: 4,
    question: 'Explain useState Hook',
    answer:
      'useState is a Hook that lets you add state to functional components. It returns an array with two elements: the current state value and a function to update it.',
    difficulty: 'Easy',
    category: 'Hooks',
    createdAt: new Date('2024-01-04').toISOString(),
  },
  {
    id: 5,
    question: 'What is useEffect?',
    answer:
      'useEffect is a Hook that lets you perform side effects in functional components. It runs after every render by default, but you can control when it runs using dependencies.',
    difficulty: 'Medium',
    category: 'Hooks',
    createdAt: new Date('2024-01-05').toISOString(),
  },
];

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load questions from localStorage or use initial questions
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('questions');
      if (stored) {
        try {
          setQuestions(JSON.parse(stored));
        } catch (error) {
          console.error('Error parsing questions:', error);
          setQuestions(initialQuestions);
          localStorage.setItem('questions', JSON.stringify(initialQuestions));
        }
      } else {
        setQuestions(initialQuestions);
        localStorage.setItem('questions', JSON.stringify(initialQuestions));
      }
    }
  }, []);

  const addQuestion = (question) => {
    const newQuestion = {
      ...question,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...questions, newQuestion];
    setQuestions(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('questions', JSON.stringify(updated));
    }
    return newQuestion;
  };

  const updateQuestion = (id, updatedData) => {
    const updated = questions.map((q) =>
      q.id === id
        ? { ...q, ...updatedData, updatedAt: new Date().toISOString() }
        : q
    );
    setQuestions(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('questions', JSON.stringify(updated));
    }
  };

  const deleteQuestion = (id) => {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('questions', JSON.stringify(updated));
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <QuestionsContext.Provider
      value={{ questions, addQuestion, updateQuestion, deleteQuestion }}>
      {children}
    </QuestionsContext.Provider>
  );
}
