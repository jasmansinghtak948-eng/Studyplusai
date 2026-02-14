/**
 * Test upload page
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import { GlassCard, GradientButton } from '@/components/common/UI';
import { FiUpload, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function UploadTestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    test_name: '',
    subject: '',
    total_questions: 0,
    correct_answers: 0,
    wrong_answers: 0,
    not_attempted: 0,
    time_taken: 0, // in seconds
  });

  const [chapters, setChapters] = useState<any[]>([]);
  const [newChapter, setNewChapter] = useState({ name: '', accuracy: 0 });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isNaN(Number(value)) ? value : Number(value),
    });
  };

  const handleAddChapter = () => {
    if (newChapter.name && newChapter.accuracy > 0) {
      setChapters([...chapters, { ...newChapter }]);
      setNewChapter({ name: '', accuracy: 0 });
      toast.success('Chapter added');
    } else {
      toast.error('Please fill chapter details');
    }
  };

  const handleRemoveChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.test_name || !formData.subject) {
      toast.error('Please fill test name and subject');
      return;
    }

    setLoading(true);

    try {
      const chapterPerformance: any = {};
      chapters.forEach((ch) => {
        chapterPerformance[ch.name] = {
          accuracy: ch.accuracy,
          correct: Math.round((ch.accuracy / 100) * formData.total_questions),
          total: formData.total_questions,
        };
      });

      await apiService.uploadTest({
        ...formData,
        chapter_performance: chapterPerformance,
      });

      toast.success('Test uploaded successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-lavender via-pastel-sky-blue to-pastel-mint p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-poppins font-bold text-white mb-2">
            📝 Upload Test Result
          </h1>
          <p className="text-white/60">Add your test scores for AI analysis</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Test Basic Info */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Test Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Test Name</label>
                  <input
                    type="text"
                    name="test_name"
                    value={formData.test_name}
                    onChange={handleInputChange}
                    placeholder="e.g., Biology Mock Test"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"
                  >
                    <option value="">Select Subject</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Questions & Answers */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Performance Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Total Questions</label>
                  <input
                    type="number"
                    name="total_questions"
                    value={formData.total_questions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Correct Answers</label>
                  <input
                    type="number"
                    name="correct_answers"
                    value={formData.correct_answers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Wrong Answers</label>
                  <input
                    type="number"
                    name="wrong_answers"
                    value={formData.wrong_answers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Not Attempted</label>
                  <input
                    type="number"
                    name="not_attempted"
                    value={formData.not_attempted}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/80 mb-2 text-sm">Time Taken (in seconds)</label>
                  <input
                    type="number"
                    name="time_taken"
                    value={formData.time_taken}
                    onChange={handleInputChange}
                    placeholder="e.g., 3600 for 1 hour"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Chapter-wise Performance */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Chapter-wise Performance</h2>
              <div className="space-y-4">
                {/* Add Chapter Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-white/20">
                  <input
                    type="text"
                    value={newChapter.name}
                    onChange={(e) => setNewChapter({ ...newChapter, name: e.target.value })}
                    placeholder="Chapter name"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                  <input
                    type="number"
                    value={newChapter.accuracy}
                    onChange={(e) => setNewChapter({ ...newChapter, accuracy: Number(e.target.value) })}
                    placeholder="Accuracy %"
                    min="0"
                    max="100"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={handleAddChapter}
                    className="px-4 py-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-medium hover:shadow-lg transition"
                  >
                    Add Chapter
                  </motion.button>
                </div>

                {/* Added Chapters */}
                {chapters.length > 0 && (
                  <div className="space-y-2">
                    {chapters.map((chapter, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-between items-center p-4 rounded-lg bg-white/10 border border-white/20"
                      >
                        <div className="flex-1">
                          <p className="text-white font-medium">{chapter.name}</p>
                          <p className="text-white/60 text-sm">{chapter.accuracy}% accuracy</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          type="button"
                          onClick={() => handleRemoveChapter(i)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-400"
                        >
                          <FiX size={20} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FiUpload /> {loading ? 'Uploading...' : 'Upload Result & Analyze'}
            </motion.button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
