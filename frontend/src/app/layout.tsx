/**
 * Root layout component
 */

import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'EduIntel AI - Academic Performance Intelligence System',
  description: 'AI-powered platform for academic success',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-pastel-lavender via-pastel-sky-blue to-pastel-mint min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
