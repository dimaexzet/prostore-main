import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';
import { Product } from '@/types';
import Rating from './rating';
import AddToCart from './add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';

const ProductCard = async ({ product }: { product: Product }) => {
  const imageUrl = product.images && product.images.length > 0 && product.images[0] 
    ? product.images[0] 
    : '/images/logo.svg';
    
  const cart = await getMyCart();

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={imageUrl}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 grid gap-4'>
        <div className='text-xs'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className='text-sm font-medium'>{product.name}</h2>
        </Link>
        <div className='flex-between gap-4'>
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive'>Out Of Stock</p>
          )}
        </div>
        
        {product.stock > 0 && (
          <div className='w-full'>
            <AddToCart
              cart={cart}
              item={{
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                qty: 1,
                image: imageUrl,
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
