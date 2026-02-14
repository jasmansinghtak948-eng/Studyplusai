'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBook, FiCheck } from 'react-icons/fi';

export default function Oracle() {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(0);

  const modules = [
    {
      id: 1,
      title: 'Oracle Fundamentals',
      lessons: [
        { id: 1, name: 'Introduction to Oracle Database', duration: '50 min', completed: true },
        { id: 2, name: 'System Architecture and Components', duration: '60 min', completed: true },
        { id: 3, name: 'Database Administration Basics', duration: '55 min', completed: false },
        { id: 4, name: 'Users, Roles, and Privileges', duration: '50 min', completed: false },
      ],
    },
    {
      id: 2,
      title: 'SQL Basics and Queries',
      lessons: [
        { id: 5, name: 'Data Retrieval with SELECT', duration: '60 min', completed: false },
        { id: 6, name: 'WHERE Clause and Filtering', duration: '55 min', completed: false },
        { id: 7, name: 'Joins and Relationships', duration: '70 min', completed: false },
        { id: 8, name: 'Aggregate Functions and Group By', duration: '65 min', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Data Manipulation and PL/SQL',
      lessons: [
        { id: 9, name: 'INSERT, UPDATE, DELETE Operations', duration: '55 min', completed: false },
        { id: 10, name: 'Transactions and Commits', duration: '50 min', completed: false },
        { id: 11, name: 'PL/SQL Basics and Procedures', duration: '75 min', completed: false },
        { id: 12, name: 'Triggers and Cursors', duration: '70 min', completed: false },
      ],
    },
    {
      id: 4,
      title: 'Database Performance and Optimization',
      lessons: [
        { id: 13, name: 'Indexing Strategies', duration: '60 min', completed: false },
        { id: 14, name: 'Query Optimization', duration: '70 min', completed: false },
        { id: 15, name: 'Backup and Recovery', duration: '75 min', completed: false },
        { id: 16, name: 'Monitoring and Troubleshooting', duration: '65 min', completed: false },
      ],
    },
    {
      id: 5,
      title: 'Advanced Oracle Features',
      lessons: [
        { id: 17, name: 'Partitioning and Compression', duration: '70 min', completed: false },
        { id: 18, name: 'Advanced PL/SQL Features', duration: '75 min', completed: false },
        { id: 19, name: 'Oracle Cloud and Modern Topics', duration: '80 min', completed: false },
        { id: 20, name: 'Security and Best Practices', duration: '70 min', completed: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-red-100 via-pink-100 to-red-50" />

      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/20 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/codemaster">
            <motion.div className="text-2xl font-poppins font-bold cursor-pointer">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent font-bold">🗄️ Oracle</span>
            </motion.div>
          </Link>
          <Link href="/codemaster">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-red-600 font-semibold px-6 py-2 rounded-full hover:bg-white/20 transition"
            >
              ← Back
            </motion.button>
          </Link>
        </div>
      </header>

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="glass-lg p-8 rounded-3xl mb-8 bg-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-poppins font-bold text-red-900 mb-2">Oracle Database Masterclass</h1>
                  <p className="text-red-700 text-lg">Professional database administration and development</p>
                </div>
                <div className="text-5xl">🗄️</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/40 p-4 rounded-xl">
                  <div className="text-sm text-red-700">Progress</div>
                  <div className="text-3xl font-bold text-red-900">10%</div>
                </div>
                <div className="bg-white/40 p-4 rounded-xl">
                  <div className="text-sm text-red-700">Lessons Done</div>
                  <div className="text-3xl font-bold text-red-900">2/20</div>
                </div>
                <div className="bg-white/40 p-4 rounded-xl">
                  <div className="text-sm text-red-700">Hours Learned</div>
                  <div className="text-3xl font-bold text-red-900">1.8h</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '10%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-red-400 to-pink-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-poppins font-bold text-red-900 mb-8">Course Modules</h2>

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
                  className="w-full glass-lg p-6 rounded-2xl text-left hover:shadow-lg transition bg-white/25"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">📚</div>
                      <div>
                        <h3 className="text-xl font-poppins font-bold text-red-900 mb-1">{module.title}</h3>
                        <p className="text-red-700 text-sm">{module.lessons.length} lessons</p>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: expandedLesson === module.id ? 180 : 0 }} className="text-2xl">
                      ▼
                    </motion.div>
                  </div>
                </button>

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
                        className="glass p-4 rounded-xl flex items-center justify-between hover:shadow-md transition bg-white/30"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {lesson.completed ? (
                            <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                              <FiCheck className="text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-red-400" />
                          )}
                          <div>
                            <h4 className="font-semibold text-red-900">{lesson.name}</h4>
                            <p className="text-red-600 text-sm">{lesson.duration}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 py-2 rounded-full font-semibold transition ${
                            lesson.completed ? 'bg-green-300 text-green-900' : 'bg-red-300 text-red-900 hover:bg-red-400'
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 glass-lg p-12 rounded-3xl text-center bg-white/25"
          >
            <h2 className="text-2xl font-poppins font-bold text-red-900 mb-4">Master enterprise database management!</h2>
            <p className="text-red-700 mb-8">Continue with the next lesson</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-red-400 to-pink-400 hover:shadow-lg transition"
            >
              Continue Learning →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
