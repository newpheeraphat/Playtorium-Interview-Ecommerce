"use client";
import React from 'react'
import { Button } from './ui/button'
import { useShoppingCart } from 'use-shopping-cart'
import { urlFor } from '@/app/lib/sanity';

export interface ProductCart {
  name: string;
  description: string; 
  price: number;
  currency: string;
  image: any;
  category: string;
  price_id: string;
}

const AddToBag: React.FC<ProductCart> = ({ name, description, price, currency, image, category, price_id }) => {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    category: category,
    price_id: price_id
  }

  return (
    <Button onClick={() => {
      addItem(product), handleCartClick(), console.log("hi")
    }}>
      Add To Cart
    </Button>
  )
}

export default AddToBag
