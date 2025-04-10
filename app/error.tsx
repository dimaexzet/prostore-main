'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Image
        src='/images/logo.svg'
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className='p-6 w-1/3 rounded-lg shadow-md text-center'>
        <h1 className='text-3xl font-bold mb-4'>Something went wrong!</h1>
        <p className='text-destructive mb-4'>
          {error.message || 'An unexpected error occurred'}
        </p>
        <Button onClick={() => reset()} variant='default'>
          Try again
        </Button>
        <Button
          variant='outline'
          className='ml-2'
          onClick={() => (window.location.href = '/')}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
} 