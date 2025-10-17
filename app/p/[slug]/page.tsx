
import Image from 'next/image';
import { getProductBySlug } from '../../../lib/products';
export default function PDP({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return <div>Product not found.</div>;
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card overflow-hidden">
        <div className="relative aspect-[4/3]">
          <Image src={product.images[0]} alt={product.title} fill className="object-contain p-4" />
        </div>
        {product.images[1] && (
          <div className="relative aspect-[4/3] border-t">
            <Image src={product.images[1]} alt={product.title+' lifestyle'} fill className="object-cover" />
          </div>
        )}
      </div>
      <div>
        <h1 className="h1">{product.title}</h1>
        <p className="text-gray-600">{product.subtitle}</p>
        <p className="mt-4">{product.description}</p>
        <div className="mt-6 space-x-4">
          <button className="btn">Add to Cart</button>
          <a href="/visualize" className="btn">See in Your Room</a>
        </div>
        <div className="mt-8 text-sm text-gray-600">
          <div>Size (cm): {product.length_cm} × {product.width_cm} × {product.height_cm}</div>
          <div>Materials: {product.materials?.join(', ')}</div>
          <div>Finish: {product.finish}</div>
          <div>Origin: {product.origin}</div>
        </div>
      </div>
    </div>
  );
}
