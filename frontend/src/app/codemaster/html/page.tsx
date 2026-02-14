'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBook, FiCheck } from 'react-icons/fi';

export default function HTML() {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(0);

  const modules = [
    {
      id: 1,
      title: 'HTML Fundamentals',
      lessons: [
        { id: 1, name: 'HTML Basics and Structure', duration: '35 min', completed: true },
        { id: 2, name: 'Tags and Attributes', duration: '40 min', completed: true },
        { id: 3, name: 'Semantic HTML', duration: '45 min', completed: false },
        { id: 4, name: 'Document Type and Meta Tags', duration: '30 min', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Forms and Input Elements',
      lessons: [
        { id: 5, name: 'Creating Forms', duration: '50 min', completed: false },
        { id: 6, name: 'Input Types and Validation', duration: '55 min', completed: false },
        { id: 7, name: 'Form Elements and Attributes', duration: '45 min', completed: false },
        { id: 8, name: 'Accessibility in Forms', duration: '40 min', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Media and Embedding',
      lessons: [
        { id: 9, name: 'Images and Picture Tags', duration: '40 min', completed: false },
        { id: 10, name: 'Audio and Video Elements', duration: '50 min', completed: false },
        { id: 11, name: 'Embedding External Content', duration: '45 min', completed: false },
        { id: 12, name: 'SVG and Canvas', duration: '60 min', completed: false },
      ],
    },
    {
      id: 4,
      title: 'Advanced HTML Features',
      lessons: [
        { id: 13, name: 'Data Attributes and Custom Attributes', duration: '40 min', completed: false },
        { id: 14, name: 'Microdata and Schema.org', duration: '55 min', completed: false },
        { id: 15, name: 'Web Components and Custom Elements', duration: '65 min', completed: false },
        { id: 16, name: 'Best Practices and SEO', duration: '50 min', completed: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-orange-100 via-amber-100 to-orange-50" />

      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/20 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/codemaster">
            <motion.div className="text-2xl font-poppins font-bold cursor-pointer">
              <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent font-bold">📄 HTML5</span>
            </motion.div>
          </Link>
          <Link href="/codemaster">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-orange-600 font-semibold px-6 py-2 rounded-full hover:bg-white/20 transition"
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
                  <h1 className="text-4xl font-poppins font-bold text-orange-900 mb-2">HTML5 Masterclass</h1>
                  <p className="text-orange-700 text-lg">Master modern web markup and semantics</p>
                </div>
                <div className="text-5xl">📄</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/40 p-4 rounded-xl">
                  <div className="text-sm text-orange-700">Progress</div>
                  <div className="text-3xl font-bold text-orange-900">12%</div>
                </div>
                <div className="bg-white/40 p-4 rounded-xl">
                  <div className="text-sm text-orange-700">Lessons Done</div>
                  <div className="text-3xl font-bold text-orange-900">2/16</div>
                </div>
                <div className="bg-white/40 p-4 rounded-xl">
                  <div className="text-sm text-orange-700">Hours Learned</div>
                  <div className="text-3xl font-bold text-orange-900">1.5h</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '12%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-orange-400 to-red-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-poppins font-bold text-orange-900 mb-8">Course Modules</h2>

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
                        <h3 className="text-xl font-poppins font-bold text-orange-900 mb-1">{module.title}</h3>
                        <p className="text-orange-700 text-sm">{module.lessons.length} lessons</p>
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
                            <div className="w-6 h-6 rounded-full border-2 border-orange-400" />
                          )}
                          <div>
                            <h4 className="font-semibold text-orange-900">{lesson.name}</h4>
                            <p className="text-orange-600 text-sm">{lesson.duration}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 py-2 rounded-full font-semibold transition ${
                            lesson.completed ? 'bg-green-300 text-green-900' : 'bg-orange-300 text-orange-900 hover:bg-orange-400'
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
            <h2 className="text-2xl font-poppins font-bold text-orange-900 mb-4">Master semantic HTML!</h2>
            <p className="text-orange-700 mb-8">Continue with the next lesson</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-red-400 hover:shadow-lg transition"
            >
              Continue Learning →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
