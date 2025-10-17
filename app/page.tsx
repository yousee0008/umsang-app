
import ProductCard from '../components/ProductCard';
import HeroSplit from '../components/HeroSplit';
import { products } from '../lib/products';
export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSplit />
      <section>
        <h2 className="h2 mb-4">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.sku} p={p} />)}
        </div>
      </section>
    </div>
  );
}
