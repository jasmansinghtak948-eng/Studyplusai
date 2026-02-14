'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBook, FiCheck, FiLock } from 'react-icons/fi';

export default function Python() {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(0);

  const modules = [
    {
      id: 1,
      title: 'Python Fundamentals',
      lessons: [
        { id: 1, name: 'Getting Started with Python', duration: '40 min', completed: true },
        { id: 2, name: 'Variables and Data Types', duration: '45 min', completed: true },
        { id: 3, name: 'Operators and Expressions', duration: '35 min', completed: false },
        { id: 4, name: 'Input and Output', duration: '30 min', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Control Structures',
      lessons: [
        { id: 5, name: 'Conditionals: If, Elif, Else', duration: '45 min', completed: false },
        { id: 6, name: 'Loops: For and While', duration: '50 min', completed: false },
        { id: 7, name: 'List Comprehensions', duration: '40 min', completed: false },
        { id: 8, name: 'Loop Control: Break, Continue', duration: '25 min', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Functions and Modules',
      lessons: [
        { id: 9, name: 'Defining Functions', duration: '50 min', completed: false },
        { id: 10, name: 'Parameters and Arguments', duration: '55 min', completed: false },
        { id: 11, name: 'Lambda Functions', duration: '40 min', completed: false },
        { id: 12, name: 'Modules and Packages', duration: '45 min', completed: false },
      ],
    },
    {
      id: 4,
      title: 'Object-Oriented Programming',
      lessons: [
        { id: 13, name: 'Classes and Objects', duration: '60 min', completed: false },
        { id: 14, name: 'Inheritance and Polymorphism', duration: '65 min', completed: false },
        { id: 15, name: 'Encapsulation and Properties', duration: '55 min', completed: false },
        { id: 16, name: 'Magic Methods and Operators', duration: '50 min', completed: false },
      ],
    },
    {
      id: 5,
      title: 'Data Handling and Libraries',
      lessons: [
        { id: 17, name: 'Working with Files', duration: '50 min', completed: false },
        { id: 18, name: 'NumPy and Pandas Basics', duration: '75 min', completed: false },
        { id: 19, name: 'Data Visualization with Matplotlib', duration: '60 min', completed: false },
        { id: 20, name: 'Web Scraping with BeautifulSoup', duration: '65 min', completed: false },
      ],
    },
    {
      id: 6,
      title: 'Web Development with Django',
      lessons: [
        { id: 21, name: 'Django Basics and Setup', duration: '55 min', completed: false },
        { id: 22, name: 'Models, Views, and Templates', duration: '70 min', completed: false },
        { id: 23, name: 'Database Queries and ORM', duration: '65 min', completed: false },
        { id: 24, name: 'Building REST APIs', duration: '75 min', completed: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-amber-100 via-yellow-100 to-amber-50" />

      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/20 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/codemaster">
            <motion.div className="text-2xl font-poppins font-bold cursor-pointer">
              <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent font-bold">🐍 Python</span>
            </motion.div>
          </Link>
          <Link href="/codemaster">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-amber-600 font-semibold px-6 py-2 rounded-full hover:bg-white/20 transition"
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
                  <h1 className="text-4xl font-poppins font-bold text-amber-900 mb-2">Python Masterclass</h1>
                  <p className="text-amber-700 text-lg">From beginner to professional developer</p>
                </div>
                <div className="text-5xl">🐍</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/40 p-4 rounded-xl">
                  <div className="text-sm text-amber-700">Progress</div>
                  <div className="text-3xl font-bold text-amber-900">8%</div>
                </div>
                <div className="bg-white/40 p-4 rounded-xl">
                  <div className="text-sm text-amber-700">Lessons Done</div>
                  <div className="text-3xl font-bold text-amber-900">2/24</div>
                </div>
                <div className="bg-white/40 p-4 rounded-xl">
                  <div className="text-sm text-amber-700">Hours Learned</div>
                  <div className="text-3xl font-bold text-amber-900">1.6h</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '8%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-poppins font-bold text-amber-900 mb-8">Course Modules</h2>

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
                        <h3 className="text-xl font-poppins font-bold text-amber-900 mb-1">{module.title}</h3>
                        <p className="text-amber-700 text-sm">{module.lessons.length} lessons</p>
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
                            <div className="w-6 h-6 rounded-full border-2 border-amber-400" />
                          )}
                          <div>
                            <h4 className="font-semibold text-amber-900">{lesson.name}</h4>
                            <p className="text-amber-600 text-sm">{lesson.duration}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 py-2 rounded-full font-semibold transition ${
                            lesson.completed ? 'bg-green-300 text-green-900' : 'bg-amber-300 text-amber-900 hover:bg-amber-400'
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
            <h2 className="text-2xl font-poppins font-bold text-amber-900 mb-4">Become a Python expert!</h2>
            <p className="text-amber-700 mb-8">Continue with the next lesson</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-amber-400 to-yellow-400 hover:shadow-lg transition"
            >
              Continue Learning →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
