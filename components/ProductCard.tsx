
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../lib/products';
export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/p/${p.slug}`} className="card overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
      <div className="relative aspect-[4/3]">
        <Image src={p.images[0]} alt={p.title} fill className="object-contain p-4 bg-white" />
      </div>
      <div className="p-4">
        <h3 className="h3">{p.title}</h3>
        <p className="text-gray-500 text-sm">{p.subtitle}</p>
        <p className="mt-2 font-semibold">₹{p.price_sale?.toLocaleString() ?? '—'}</p>
      </div>
    </Link>
  );
}
