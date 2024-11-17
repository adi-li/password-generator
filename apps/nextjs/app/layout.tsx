import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Passwords Generator',
  description: 'Generate passwords in bulk easily',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark font-sans antialiased">{children}</body>
    </html>
  );
}
