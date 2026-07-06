import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atelier | Digital Haute Couture',
  description: 'A timeless, premium, handcrafted digital brand identity for luxury ladies tailoring.',
  openGraph: {
    title: 'Atelier | Digital Haute Couture',
    description: 'A timeless, premium, handcrafted digital brand identity for luxury ladies tailoring.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${poppins.variable}`}>
      <body className="antialiased font-poppins bg-bg-primary text-text-primary selection:bg-champagne selection:text-onyx">
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}
