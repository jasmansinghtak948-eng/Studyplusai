/**
 * Common UI components for Study Plus AI
 */

import React from 'react';
import { motion } from 'framer-motion';

export function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-dark p-6 rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function GradientButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-400 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50',
    secondary: 'bg-white/20 hover:bg-white/30 border border-white/30',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const increment = value / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}
