"use client"
import { urlFor } from '@/app/lib/sanity';
import Image from 'next/image';
import React, { useState } from 'react'

interface iAppProps {
  image: any;
}

const ImageGallery: React.FC<iAppProps> = ({ image }) => {
  const [bigImage, setBigImage] = useState(image[0]);

  const handleSmallImageHover = (img: any) => {
    setBigImage(img)
  }

  return (
    <div className='grid gap-4 lg:grid-cols-5'>
      <div className='order-last flex gap-4 lg:order-none lg:flex-col'>
        {image.map((img: any, idx: any) => {
          return (
            <div key={idx} className='overflow-hidden rounded-lg bg-gray-100'>
              <Image
                src={urlFor(img).url()}
                alt='photo'
                width={200}
                height={200}
                className='h-full w-full object-cover object-center hover:opacity-75 transition duration-100'
                onMouseEnter={() => handleSmallImageHover(img)}
                onMouseLeave={() => handleSmallImageHover(img)}
              />
            </div>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image 
          src={urlFor(bigImage).url()}
          alt='Photo'
          width={500}
          height={500}
          className='h-full w-full object-cover object-center'
        />

        <span className='absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-tight text-white'>
          Sale
        </span>
      </div>

    </div>
  )
};

export default ImageGallery;
