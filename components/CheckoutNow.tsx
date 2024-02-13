'use client';
import React from 'react';
import { Button } from './ui/button';
import { useShoppingCart } from 'use-shopping-cart';
import { urlFor } from '@/app/lib/sanity';
import { ProductCart } from './AddToBag';

const CheckoutNow: React.FC<ProductCart> = ({
  name,
  description,
  price,
  currency,
  image,
  category,
  price_id,
}) => {
  const { checkoutSingleItem } = useShoppingCart();

  const buyNow = (price_id: string) => {
    checkoutSingleItem(price_id);
  }

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    category: category,
    price_id: price_id,
  };

  return (
    <Button
      onClick={() => {
        buyNow(product.price_id)
      }}
    >
      Add To Cart
    </Button>
  );
};

export default CheckoutNow;
