/**
 * Homepage for Study Plus AI
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GradientButton, FloatingElement, AnimatedCounter } from '@/components/common/UI';
import { FiArrowRight, FiCheck, FiTrendingUp } from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const performanceData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 85 },
];

const heatmapData = [
  { chapter: 'Ch1', accuracy: 75 },
  { chapter: 'Ch2', accuracy: 82 },
  { chapter: 'Ch3', accuracy: 68 },
  { chapter: 'Ch4', accuracy: 88 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-lavender via-pastel-sky-blue to-pastel-mint">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-poppins font-bold gradient-text"
          >
            ✨ Study Plus AI
          </motion.div>
          <div className="hidden md:flex gap-8 text-white">
            <a href="#features" className="hover:opacity-80 transition">Features</a>
            <a href="#demo" className="hover:opacity-80 transition">Demo</a>
            <a href="#testimonials" className="hover:opacity-80 transition">Testimonials</a>
          </div>
          <div></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6 leading-tight">
                Your Personal <span className="gradient-text">AI Study Coach</span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Boost your academic performance with AI-powered analytics, personalized study plans, and intelligent recommendations.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
                >
                  Watch Demo
                </motion.button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                  { label: 'Students', value: 5000 },
                  { label: 'Improvement', value: 35, suffix: '%' },
                  { label: 'Success Rate', value: 92, suffix: '%' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="text-white"
                  >
                    <div className="text-3xl font-bold">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-white/60">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <FloatingElement>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Performance Trend</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8ec5fc" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#a5fecb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="white/20" />
                      <XAxis dataKey="month" stroke="white/50" />
                      <YAxis stroke="white/50" />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="score" stroke="#8ec5fc" fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-poppins font-bold text-center text-white mb-16"
          >
            Powerful Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Performance Analytics',
                description: 'Get detailed insights into your strengths and weaknesses',
              },
              {
                icon: '🤖',
                title: 'AI-Powered Coaching',
                description: 'Personalized study plans based on your learning style',
              },
              {
                icon: '📈',
                title: 'Rank Predictor',
                description: 'Predict your performance and track your improvement',
              },
              {
                icon: '🔥',
                title: 'Burnout Detection',
                description: 'Monitor stress levels and get recovery recommendations',
              },
              {
                icon: '🎯',
                title: 'Smart Recommendations',
                description: 'Focus on high-impact topics for maximum improvement',
              },
              {
                icon: '🌡️',
                title: 'Heatmap Analysis',
                description: 'Visualize weak areas and track chapter-wise performance',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/20 transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-poppins font-bold text-center text-white mb-16"
          >
            Dashboard Preview
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Accuracy by Chapter</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={heatmapData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="white/20" />
                    <XAxis dataKey="chapter" stroke="white/50" />
                    <YAxis stroke="white/50" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
                    <Bar dataKey="accuracy" fill="#8ec5fc" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col justify-center gap-4">
                {[
                  'Upload test scores instantly',
                  'Get AI-powered recommendations',
                  'Track your improvement journey',
                  'Receive burnout alerts',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-center text-white"
                  >
                    <div className="p-2 rounded-full bg-green-400/30">
                      <FiCheck className="text-green-300" size={20} />
                    </div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-poppins font-bold text-center text-white mb-16"
          >
            What Students Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Arjun',
                text: 'Improved my score by 30% in just 2 months!',
                rating: 5,
              },
              {
                name: 'Priya',
                text: 'The burnout detection helped me maintain balance.',
                rating: 5,
              },
              {
                name: 'Rohan',
                text: 'Best study companion! Highly recommend!',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6"
              >
                <div className="mb-4">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-white/80 mb-4">{testimonial.text}</p>
                <p className="text-white font-semibold">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-poppins font-bold text-white mb-6">
              Ready to Excel?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of students already improving their grades with Study Plus AI
            </p>
            <GradientButton className="px-8 py-4 text-lg">
              Explore Dashboard
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-white/60">
          <div>© 2024 Study Plus AI. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
