'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCode, FiBook, FiAward, FiUsers, FiTrendingUp, FiTarget } from 'react-icons/fi';

export default function CodeMasterHub() {
  const courses = [
    {
      id: 1,
      name: 'C Programming',
      description: 'Master the fundamentals of C programming from basics to advanced concepts',
      icon: '🔤',
      color: 'from-blue-300 to-cyan-300',
      lessons: 45,
      students: 1204,
      rating: 4.8,
      link: '/codemaster/c',
      topics: ['Variables', 'Loops', 'Functions', 'Pointers', 'Structs', 'File I/O'],
      levels: ['Beginner', 'Intermediate', 'Advanced'],
      duration: '40 hours',
    },
    {
      id: 2,
      name: 'C++ Programming',
      description: 'Learn object-oriented programming with C++ and build modern applications',
      icon: '⚡',
      color: 'from-rose-300 to-pink-300',
      lessons: 52,
      students: 892,
      rating: 4.9,
      link: '/codemaster/cpp',
      topics: ['OOP', 'Classes', 'Inheritance', 'Polymorphism', 'STL', 'Templates'],
      levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      duration: '48 hours',
    },
    {
      id: 3,
      name: 'Python Programming',
      description: 'From beginner to professional developer with comprehensive Python courses',
      icon: '🐍',
      color: 'from-amber-300 to-yellow-300',
      lessons: 58,
      students: 2156,
      rating: 4.9,
      link: '/codemaster/python',
      topics: ['Basics', 'OOP', 'Libraries', 'Data Science', 'Web Dev', 'Django'],
      levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      duration: '52 hours',
    },
    {
      id: 4,
      name: 'HTML5',
      description: 'Master modern web markup and semantic HTML for building accessible websites',
      icon: '📄',
      color: 'from-orange-300 to-red-300',
      lessons: 40,
      students: 1876,
      rating: 4.7,
      link: '/codemaster/html',
      topics: ['Structure', 'Forms', 'Media', 'Semantics', 'Accessibility', 'SEO'],
      levels: ['Beginner', 'Intermediate', 'Advanced'],
      duration: '24 hours',
    },
    {
      id: 5,
      name: 'CSS3',
      description: 'Create beautiful designs with modern styling and responsive layouts',
      icon: '🎨',
      color: 'from-blue-300 to-indigo-300',
      lessons: 48,
      students: 2034,
      rating: 4.8,
      link: '/codemaster/css',
      topics: ['Styling', 'Flexbox', 'Grid', 'Animations', 'Responsive', 'Frameworks'],
      levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      duration: '36 hours',
    },
    {
      id: 6,
      name: 'Oracle Database',
      description: 'Professional database administration and SQL development for enterprise systems',
      icon: '🗄️',
      color: 'from-red-300 to-pink-300',
      lessons: 56,
      students: 645,
      rating: 4.9,
      link: '/codemaster/oracle',
      topics: ['SQL', 'PL/SQL', 'Admin', 'Performance', 'Security', 'Optimization'],
      levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      duration: '56 hours',
    },
  ];

  const stats = [
    { label: 'Total Students', value: '8,807+', icon: FiUsers },
    { label: 'Lessons Available', value: '299', icon: FiBook },
    { label: 'Completion Rate', value: '91%', icon: FiAward },
    { label: 'Average Rating', value: '4.85/5', icon: FiTrendingUp },
  ];

  const highlights = [
    {
      icon: FiCode,
      title: 'Interactive Coding',
      description: 'Write and execute code directly in the browser with real-time feedback',
    },
    {
      icon: FiBook,
      title: 'Comprehensive Lessons',
      description: 'Step-by-step tutorials with real-world examples and best practices',
    },
    {
      icon: FiAward,
      title: 'Professional Certifications',
      description: 'Earn recognized certificates demonstrating your expertise',
    },
    {
      icon: FiTarget,
      title: 'Practice Problems',
      description: '1000+ coding challenges to strengthen your skills',
    },
  ];

  const skillLevels = [
    {
      level: 'Beginner',
      color: 'from-green-400 to-emerald-400',
      description: 'Perfect for starting your coding journey',
      time: '20-30 hours',
    },
    {
      level: 'Intermediate',
      color: 'from-blue-400 to-blue-500',
      description: 'Build on your fundamentals with advanced concepts',
      time: '30-40 hours',
    },
    {
      level: 'Advanced',
      color: 'from-purple-400 to-purple-600',
      description: 'Master professional-level skills',
      time: '40-50 hours',
    },
    {
      level: 'Expert',
      color: 'from-red-400 to-pink-500',
      description: 'Achieve mastery with cutting-edge techniques',
      time: '50+ hours',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-pastel-lavender via-pastel-sky-blue to-pastel-mint" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <motion.div className="text-2xl font-poppins font-bold gradient-text cursor-pointer">
              💻 CodeMaster
            </motion.div>
          </Link>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-white font-semibold px-6 py-2 rounded-full hover:bg-white/10 transition"
            >
              Back
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
              Master <span className="gradient-text">Programming & Databases</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Learn C, C++, Python, HTML, CSS, and Oracle from industry experts with interactive lessons, real-world projects, and professional certifications.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-2xl"
                >
                  <Icon className="text-2xl text-rose-300 mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Professional Levels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-poppins font-bold text-white text-center mb-8">Professional Skill Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skillLevels.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`glass p-6 rounded-2xl hover:shadow-lg transition`}
                >
                  <div className={`text-2xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent mb-3`}>
                    {skill.level}
                  </div>
                  <p className="text-white/80 text-sm mb-3">{skill.description}</p>
                  <div className="text-white/60 text-xs">⏱️ {skill.time}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Course Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-3xl font-poppins font-bold text-white text-center mb-12">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="group"
                >
                  <Link href={course.link}>
                    <div className="glass-lg p-8 h-full hover:shadow-2xl transition-all duration-300 cursor-pointer">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-5xl">{course.icon}</span>
                        <div className="text-right">
                          <div className="text-yellow-300 text-lg font-bold">⭐ {course.rating}</div>
                          <div className="text-white/60 text-sm">{course.students} students</div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-poppins font-bold text-white mb-3">{course.name}</h3>
                      <p className="text-white/70 mb-6 text-sm">{course.description}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <FiBook className="text-white/60" />
                        <span className="text-white/70 text-sm">{course.lessons} lessons • {course.duration}</span>
                      </div>

                      <div className="mb-6">
                        <div className="text-white/60 text-xs mb-2 font-semibold">SKILL LEVELS:</div>
                        <div className="flex flex-wrap gap-1">
                          {course.levels.map((level, j) => {
                            const colors: Record<string, string> = {
                              'Beginner': 'bg-green-400/30 text-green-300',
                              'Intermediate': 'bg-blue-400/30 text-blue-300',
                              'Advanced': 'bg-purple-400/30 text-purple-300',
                              'Expert': 'bg-red-400/30 text-red-300',
                            };
                            return (
                              <span
                                key={j}
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[level]}`}
                              >
                                {level}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="text-white/60 text-xs mb-2 font-semibold">TOPICS:</div>
                        <div className="flex flex-wrap gap-2">
                          {course.topics.slice(0, 3).map((topic, j) => (
                            <span
                              key={j}
                              className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80"
                            >
                              {topic}
                            </span>
                          ))}
                          {course.topics.length > 3 && (
                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/50">
                              +{course.topics.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className={`w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r ${course.color} hover:shadow-lg transition`}
                      >
                        Start Learning →
                      </motion.button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mt-20"
          >
            <h2 className="text-4xl font-poppins font-bold text-white text-center mb-12">
              Why Choose <span className="gradient-text">CodeMaster</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9 + i * 0.1 }}
                    className="glass p-6 rounded-2xl text-center"
                  >
                    <Icon className="text-4xl text-purple-300 mx-auto mb-4" />
                    <h3 className="text-lg font-poppins font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3 }}
            className="mt-20 glass-lg p-12 rounded-3xl text-center"
          >
            <h2 className="text-3xl font-poppins font-bold text-white mb-4">
              Ready to become a programming expert?
            </h2>
            <p className="text-white/70 mb-8 text-lg max-w-2xl mx-auto">
              Choose your first course and start your journey to mastering programming languages and databases at your own pace.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/codemaster/c">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-blue-300 to-cyan-300 hover:shadow-lg transition"
                >
                  Start C →
                </motion.button>
              </Link>
              <Link href="/codemaster/python">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-amber-300 to-yellow-300 hover:shadow-lg transition"
                >
                  Start Python →
                </motion.button>
              </Link>
              <Link href="/codemaster/cpp">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-rose-300 to-pink-300 hover:shadow-lg transition"
                >
                  Start C++ →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
