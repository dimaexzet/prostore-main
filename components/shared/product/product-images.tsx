'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  // If there are no images, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className='space-y-4'>
        <Image
          src="/images/logo.svg"
          alt='product image'
          width={1000}
          height={1000}
          className='min-h-[300px] object-cover object-center'
        />
      </div>
    );
  }

  // Filter out any empty image URLs
  const validImages = images.filter(img => img && img.trim() !== '');

  // If all images were empty strings, show placeholder
  if (validImages.length === 0) {
    return (
      <div className='space-y-4'>
        <Image
          src="/images/logo.svg"
          alt='product image'
          width={1000}
          height={1000}
          className='min-h-[300px] object-cover object-center'
        />
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <Image
        src={validImages[current] || "/images/logo.svg"}
        alt='product image'
        width={1000}
        height={1000}
        className='min-h-[300px] object-cover object-center'
      />
      <div className='flex'>
        {validImages.map((image, index) => (
          <div
            key={image + index}
            onClick={() => setCurrent(index)}
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600',
              current === index && 'border-orange-500'
            )}
          >
            <Image src={image} alt='image' width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
