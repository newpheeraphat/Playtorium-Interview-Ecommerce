import React from 'react'
import { CheckCheck, Cross, XCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ErrorStripe = () => {
  return (
    <div className='h-screen'>
      <div className='mt-32 md:max-w-[50vw] mx-auto'>
        <XCircleIcon className='text-red-600 h-16 w-16 mx-auto my-6' />
        <div className='text-center'>
          <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
            Payment Failed!
          </h3>
          <p className='text-gray-600 py-2'>
            Thank you for your purchase we hope you still with us
          </p>
          <p>Have a great day!</p>

          <Button asChild className='mt-5'>
            <Link href='/'>Go back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorStripe;
