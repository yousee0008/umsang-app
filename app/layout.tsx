
import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Umsang', description: 'Premium home décor by Umsang' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="container flex items-center justify-between h-16">
            <Link href="/" className="font-semibold text-lg">Umsang</Link>
            <div className="space-x-4">
              <Link href="/shop" className="btn">Shop</Link>
              <Link href="/visualize" className="btn">See in Your Room</Link>
              <Link href="/admin" className="btn">Admin</Link>
            </div>
          </nav>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="container py-8 text-sm text-gray-500">© {new Date().getFullYear()} Umsang</footer>
      </body>
    </html>
  );
}
