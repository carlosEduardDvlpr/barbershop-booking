import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const font_inter = Inter({
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Agendamento Barbearia',
  description: 'agende já seu horário.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${font_inter.className} antialiased`}>{children}</body>
    </html>
  );
}
