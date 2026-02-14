'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBook, FiCheck, FiLock, FiStar, FiCode } from 'react-icons/fi';

export default function CProgramming() {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(0);

  const modules = [
    {
      id: 1,
      title: 'Getting Started with C',
      lessons: [
        { id: 1, name: 'Introduction to C', duration: '45 min', completed: true },
        { id: 2, name: 'Setting Up Your Environment', duration: '30 min', completed: true },
        { id: 3, name: 'Your First C Program', duration: '25 min', completed: true },
        { id: 4, name: 'Basic Syntax & Data Types', duration: '40 min', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Variables and Data Types',
      lessons: [
        { id: 5, name: 'Understanding Variables', duration: '35 min', completed: false },
        { id: 6, name: 'Integer Types (int, long, short)', duration: '40 min', completed: false },
        { id: 7, name: 'Floating Point Numbers', duration: '35 min', completed: false },
        { id: 8, name: 'Characters and Strings', duration: '50 min', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Control Flow',
      lessons: [
        { id: 9, name: 'If, Else If, Else Statements', duration: '40 min', completed: false },
        { id: 10, name: 'Switch Statements', duration: '35 min', completed: false },
        { id: 11, name: 'Loops: For, While, Do-While', duration: '60 min', completed: false },
        { id: 12, name: 'Break and Continue', duration: '25 min', completed: false },
      ],
    },
    {
      id: 4,
      title: 'Functions',
      lessons: [
        { id: 13, name: 'Function Basics and Declaration', duration: '45 min', completed: false },
        { id: 14, name: 'Parameters and Return Values', duration: '50 min', completed: false },
        { id: 15, name: 'Scope and Lifetime', duration: '40 min', completed: false },
        { id: 16, name: 'Recursion', duration: '55 min', completed: false },
      ],
    },
    {
      id: 5,
      title: 'Pointers and Arrays',
      lessons: [
        { id: 17, name: 'Array Basics', duration: '45 min', completed: false },
        { id: 18, name: 'Multi-dimensional Arrays', duration: '50 min', completed: false },
        { id: 19, name: 'Introduction to Pointers', duration: '60 min', completed: false },
        { id: 20, name: 'Pointer Arithmetic', duration: '55 min', completed: false },
      ],
    },
    {
      id: 6,
      title: 'Structures and Unions',
      lessons: [
        { id: 21, name: 'Defining Structures', duration: '45 min', completed: false },
        { id: 22, name: 'Nested Structures', duration: '40 min', completed: false },
        { id: 23, name: 'Unions and Enumerations', duration: '50 min', completed: false },
        { id: 24, name: 'Working with File I/O', duration: '60 min', completed: false },
      ],
    },
  ];

  const progressPercentage = 3; // 3 lessons completed out of 24

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-100 via-cyan-100 to-blue-50" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/20 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link href="/codemaster">
              <motion.div className="text-2xl font-poppins font-bold gradient-text cursor-pointer">
                🔤 C Programming
              </motion.div>
            </Link>
          </div>
          <Link href="/codemaster">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-white/20 transition"
            >
              ← Back
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="glass-lg p-8 rounded-3xl mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-poppins font-bold text-blue-900 mb-2">C Programming Masterclass</h1>
                  <p className="text-blue-700 text-lg">Master the fundamentals of C programming</p>
                </div>
                <div className="text-5xl">🔤</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/30 p-4 rounded-xl">
                  <div className="text-sm text-blue-700">Progress</div>
                  <div className="text-3xl font-bold text-blue-900">{progressPercentage}%</div>
                </div>
                <div className="bg-white/30 p-4 rounded-xl">
                  <div className="text-sm text-blue-700">Lessons Done</div>
                  <div className="text-3xl font-bold text-blue-900">3/24</div>
                </div>
                <div className="bg-white/30 p-4 rounded-xl">
                  <div className="text-sm text-blue-700">Hours Learned</div>
                  <div className="text-3xl font-bold text-blue-900">2.5h</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Course Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-poppins font-bold text-blue-900 mb-8">Course Modules</h2>

            {modules.map((module, moduleIdx) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + moduleIdx * 0.1 }}
                className="mb-6"
              >
                <button
                  onClick={() => setExpandedLesson(expandedLesson === module.id ? null : module.id)}
                  className="w-full glass-lg p-6 rounded-2xl text-left hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">📚</div>
                      <div>
                        <h3 className="text-xl font-poppins font-bold text-blue-900 mb-1">{module.title}</h3>
                        <p className="text-blue-700 text-sm">{module.lessons.length} lessons</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedLesson === module.id ? 180 : 0 }}
                      className="text-2xl"
                    >
                      ▼
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Lessons */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedLesson === module.id ? 1 : 0,
                    height: expandedLesson === module.id ? 'auto' : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3 pl-6">
                    {module.lessons.map((lesson) => (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-4 rounded-xl flex items-center justify-between hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {lesson.completed ? (
                            <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                              <FiCheck className="text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-blue-400" />
                          )}
                          <div>
                            <h4 className="font-semibold text-blue-900">{lesson.name}</h4>
                            <p className="text-blue-600 text-sm">{lesson.duration}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 py-2 rounded-full font-semibold transition ${
                            lesson.completed
                              ? 'bg-green-300 text-green-900'
                              : 'bg-blue-300 text-blue-900 hover:bg-blue-400'
                          }`}
                        >
                          {lesson.completed ? '✓ Done' : 'Start'}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 glass-lg p-12 rounded-3xl text-center"
          >
            <h2 className="text-2xl font-poppins font-bold text-blue-900 mb-4">
              Keep learning and become a C expert!
            </h2>
            <p className="text-blue-700 mb-8">Continue with the next lesson</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-blue-400 to-cyan-400 hover:shadow-lg transition"
            >
              Continue Learning →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
