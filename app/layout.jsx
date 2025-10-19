import Providers from '@/components/Providers';
import { AuthProvider } from '@/lib/auth-context';
import { Analytics } from '@vercel/analytics/next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Question on React',
  description: 'Interactive React learning platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`overflow-y-auto hide-scrollbar ${geistSans.variable} ${geistMono.variable} antialiased bg-black/80`}>
        <Providers>
          <AuthProvider>
            {children}
            <Analytics />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
