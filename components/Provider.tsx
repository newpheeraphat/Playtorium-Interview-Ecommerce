"use client";
import { CartProvider as USCProvider } from "use-shopping-cart"
import { ReactNode } from "react";

interface ICartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<ICartProviderProps> = ({ children }) => {
  return (
    <USCProvider
      mode='payment'
      cartMode='client-only'
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl='https://playtorium-interview-ecommerce-4ksj2wqdl-newpheeraphat.vercel.app/stripe/success'
      cancelUrl='https://playtorium-interview-ecommerce-4ksj2wqdl-newpheeraphat.vercel.app/stripe/error'
      currency='THB'
      billingAddressCollection={false}
      shouldPersist={true}
      language='en-US'
    >
      {children}
    </USCProvider>
  );
}

export default CartProvider
