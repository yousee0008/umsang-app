
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';
export default function Shop() {
  return (
    <div>
      <h1 className="h1 mb-4">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.sku} p={p} />)}
      </div>
    </div>
  );
}
