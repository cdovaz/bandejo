import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bandejo - Your University Companion',
  description: 'Effortlessly check menus, bus schedules, and more. All in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
