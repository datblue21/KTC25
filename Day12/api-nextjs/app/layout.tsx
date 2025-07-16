// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Demo 4 rendering modes in Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
        <main>{children}</main>
      </body>
    </html>
  );
}
