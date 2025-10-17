
'use client';
import Link from 'next/link';
type Panel = { title: string; sub: string; href: string; bg: string; };
export default function HeroSplit() {
  const left: Panel = { title: 'Visualize your room', sub: 'Upload your room photo and try products live.', href: '/visualize', bg: "url('/images/hero-visualize.jpg')" };
  const right: Panel = { title: 'Explore our products', sub: 'Browse curated pieces for every room.', href: '/shop', bg: "url('/images/hero-shop.jpg')" };
  const base = 'relative flex items-end min-h-[60vh] p-8 text-white';
  const overlay = 'absolute inset-0 bg-black/35 hover:bg-black/25 transition-colors';
  const content = 'relative z-10';
  const title = 'text-3xl md:text-4xl font-semibold drop-shadow';
  const sub = 'mt-2 text-sm md:text-base text-white/90';
  const cta = 'mt-4 inline-block px-5 py-2 rounded-xl bg-white/90 text-black hover:bg-white focus-visible:ring-2 ring-black/40';
  return (
    <section className="grid md:grid-cols-2 gap-4 md:gap-6">
      {[left, right].map((p, i) => (
        <Link key={i} href={p.href} aria-label={p.title} className="rounded-3xl overflow-hidden shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30" style={{ backgroundImage: p.bg, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className={base}>
            <div className={overlay} />
            <div className={content}>
              <h2 className={title}>{p.title}</h2>
              <p className={sub}>{p.sub}</p>
              <span className={cta}>Click to start</span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
