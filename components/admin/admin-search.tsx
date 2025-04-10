'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname?.includes('/admin/orders')
    ? '/admin/orders'
    : pathname?.includes('/admin/users')
      ? '/admin/users'
      : '/admin/products';

  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams?.get('query') || ''
  );

  useEffect(() => {
    setSearchTerm(searchParams?.get('query') || '');
  }, [searchParams]);

  return (
    <div className='relative'>
      <form
        action={formActionUrl}
        className='relative flex w-full items-center'
      >
        <Input
          type='search'
          placeholder='Search...'
          name='query'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='md:w-[100px] lg:w-[300px]'
        />
      </form>
    </div>
  );
};

export default AdminSearch;
