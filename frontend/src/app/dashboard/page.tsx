/**
 * Main dashboard page
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { apiService } from '@/services/api';
import { GlassCard, AnimatedCounter } from '@/components/common/UI';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiLogOut, FiArrowUp, FiTrendingUp } from 'react-icons/fi';
import Link from 'next/link';

const testTrendData = [
  { date: '1 day', score: 65 },
  { date: '3 days', score: 72 },
  { date: '1 week', score: 78 },
  { date: '2 weeks', score: 85 },
];

const chapterData = [
  { name: 'Chapter 1', accuracy: 75 },
  { name: 'Chapter 2', accuracy: 82 },
  { name: 'Chapter 3', accuracy: 68 },
  { name: 'Chapter 4', accuracy: 88 },
];

const COLORS = ['#8ec5fc', '#a5fecb', '#ffdab9', '#ffb6c1'];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getDashboard() as any;
        setMetrics(response.metrics || response);
        
        const recsResponse = await apiService.getRecommendations() as any;
        setRecommendations(recsResponse.recommendations || recsResponse || []);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pastel-lavender via-pastel-sky-blue to-pastel-mint flex items-center justify-center">
        <div className="text-white text-2xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-lavender via-pastel-sky-blue to-pastel-mint p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-poppins font-bold text-white mb-2">
            Welcome, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-white/60">Your academic performance at a glance</p>
        </div>
        <div className="flex gap-4">
          <Link href="/tests/upload">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold"
            >
              Upload Test
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={logout}
            className="px-6 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-white font-semibold hover:bg-red-500/30 transition flex items-center gap-2"
          >
            <FiLogOut /> Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        {[
          { label: 'Overall Accuracy', value: metrics?.overall_accuracy || 0, unit: '%' },
          { label: 'Tests Uploaded', value: metrics?.test_count || 0, unit: '' },
          { label: 'Study Sessions', value: metrics?.study_sessions || 0, unit: '' },
          { label: 'Weak Areas', value: metrics?.weak_areas_count || 0, unit: '' },
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <GlassCard className="p-6 text-center cursor-pointer">
              <p className="text-white/60 text-sm mb-4">{metric.label}</p>
              <div className="text-4xl font-bold text-white">
                <AnimatedCounter value={Math.round(metric.value)} suffix={metric.unit} />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <GlassCard>
            <h2 className="text-white font-semibold mb-4">Performance Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={testTrendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8ec5fc" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8ec5fc" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="white/20" />
                <XAxis dataKey="date" stroke="white/50" />
                <YAxis stroke="white/50" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8ec5fc"
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Burnout Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard>
            <h2 className="text-white font-semibold mb-4">Burnout Status</h2>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-400 p-1">
                  <div className="w-full h-full rounded-full bg-black/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      <AnimatedCounter value={Math.round(metrics?.burnout_score || 0)} />
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-white/60 text-center text-sm">
                {(metrics?.burnout_score || 0) > 50 ? 'Take a break soon!' : 'Keep it up!'}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Chapter Accuracy & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chapter Accuracy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard>
            <h2 className="text-white font-semibold mb-4">Chapter Accuracy</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chapterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="white/20" />
                <XAxis dataKey="name" stroke="white/50" />
                <YAxis stroke="white/50" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="accuracy" fill="#8ec5fc" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard>
            <h2 className="text-white font-semibold mb-4">📚 Study Recommendations</h2>
            {recommendations.length > 0 ? (
              <div className="space-y-3">
                {recommendations.slice(0, 5).map((rec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-lg bg-white/10 border border-white/20 hover:border-white/40 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{rec.chapter}</h3>
                        <p className="text-white/60 text-sm">
                          {rec.accuracy.toFixed(1)}% accuracy · {rec.times_attempted} attempts
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{rec.suggested_hours.toFixed(1)}h</p>
                        <p className="text-white/60 text-xs">suggested</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-white/60">Upload a test to get recommendations</p>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
