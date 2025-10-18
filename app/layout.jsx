import Providers from '@/components/Providers';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { AuthProvider } from '@/lib/auth-context';
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AuthProvider>
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(0, 17, 82)"
              gradientBackgroundEnd="rgb(108, 0, 162)"
              firstColor="18, 113, 255"
              secondColor="80, 200, 255"
              thirdColor="221, 74, 255"
              fourthColor="200, 50, 100"
              fifthColor="100, 220, 255"
              pointerColor="140, 100, 255"
              size="90%"
              blendingValue="hard-light"
              interactive={true}>
              {children}
            </BackgroundGradientAnimation>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
