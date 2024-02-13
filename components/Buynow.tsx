"use client";
import React, { useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const Buynow = () => {
  const { cartDetails, removeItem } = useShoppingCart();
  const [categoryType, setCategoryType] = useState<string>('');

  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [discount, setDiscount] = useState<any>({
    couponPrice: 0,
    onTopPrice: 0,
    seasonalPrice: 0
  });
  const [discountBath, setDiscountBath] = useState<any>(0);
  const [typingCoupon, setTypingCoupon] = useState<any>(false);
  const [typingOnTop, setTypingOnTop] = useState<any>(false);

  const [shouldCatOrPoint, setShouldCatOrPoint] = useState<boolean>(true);
  const [shouldFixedOrPercent, setShouldFixedOrPercent] = useState<boolean>(true);

  const handleFixedAmount = (event: any) => {
    try {
      event.preventDefault();
      let discountValue = event.target.value;

      if (discountValue === '') {
        console.log("hi")
        setTypingCoupon(false)
      } else {
        setTypingCoupon(true);
      }

      if (discountValue < 0) {
        throw new Error();
      }

      let newTotalPrice = Math.max(0, Math.abs(discount.couponPrice - discountValue));
      setTotalPrice(newTotalPrice);
      setDiscount((prev: any) => ({...prev, onTopPrice: newTotalPrice}));
    } catch (error: any) {
      console.log(error)
    }
  };

  const handlePercentDiscount = (event: any) => {
    try {
      event.preventDefault();
      let percentValue = event.target.value;

      if (percentValue === '') {
        setTypingCoupon(false);
      } else {
        setTypingCoupon(true);
      }
      
      if (percentValue < 0 || percentValue > 100) {
        throw new Error('Percent value must be between 0 and 100.');
      }

      let percentDiscount = (percentValue / 100) * discount.couponPrice;
      let newTotalPrice = Math.max(0, parseInt(Math.abs(discount.couponPrice - percentDiscount).toFixed(1)));
      setTotalPrice(newTotalPrice);
      setDiscount((prev: any) => ({ ...prev, onTopPrice: newTotalPrice }));
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleCategoryType = (event: any) => {
    event.preventDefault();
    let categoryValue = event.target.value;
    setCategoryType(categoryValue);
  }

  const handleCategoryDiscount = (event: any) => {
    event.preventDefault();
    let percentValue = event.target.value;
    let sumCategoryPrice:number = 0;

    if (percentValue === '') {
      setTotalPrice(discount.onTopPrice);
      setTypingOnTop(false)
      return; 
    } else {
      setTypingOnTop(true);
    }

    Object.keys(cartDetails!).forEach((itemId) => {
      const item = cartDetails![itemId];
      if (item.category === categoryType) {
        sumCategoryPrice += item.price * item.quantity;
      }
    });

    if (percentValue < 0 || percentValue > 100) {
      throw new Error('Percent value must be between 0 and 100.');
    }

    let percentDiscount = (percentValue / 100) * sumCategoryPrice;
    let newTotalPrice = Math.max(0, parseInt(Math.abs(discount.onTopPrice - percentDiscount).toFixed(1)));
    setTotalPrice(newTotalPrice);
    setDiscount((prev: any) => ({...prev, seasonalPrice: newTotalPrice}))
  }

  const handlePointDiscount = (event: any) => {
    event.preventDefault();
    let pointValue = event.target.value;
    let prevTotal = discount.onTopPrice
    let MAX_PERCENT_DISCOUNT = 0.20;

    if (pointValue === '') {
      setTotalPrice(prevTotal);
      setTypingOnTop(false);
      return;
    } else {
      setTypingOnTop(true);
    }

    setTypingOnTop(true)
    
    let maximumDiscountPoint = prevTotal * MAX_PERCENT_DISCOUNT;
    let newTotalPrice: number = 0;

    if (pointValue > maximumDiscountPoint) {
      newTotalPrice = Math.max(0, prevTotal - Math.floor(maximumDiscountPoint));
      pointValue = pointValue - Math.floor(maximumDiscountPoint);
    } else {
      newTotalPrice = Math.max(0, prevTotal - pointValue);
    }

    setTotalPrice(newTotalPrice);
    setDiscount((prev: any) => ({ ...prev, seasonalPrice: newTotalPrice }));
  }

  const handleChangeEveryBath = (event: any) => {
    event.preventDefault();
    setDiscountBath(event.target.value);
  }

  const handleSpecialCampaigns = (event: any) => {
    event.preventDefault();
    let discountValue = event.target.value;
    let prevTotal = discount.seasonalPrice;

    if (discountValue === '' || discountBath === '') {
      setTotalPrice(prevTotal);
      return;
    }

    let countDiscount = Math.floor(prevTotal / discountValue);
    let totalDiscount = countDiscount * discountBath; 
    let newTotalPrice = Math.max(0, parseInt((prevTotal - totalDiscount).toFixed(1)));
    setTotalPrice(newTotalPrice)
  }

  useEffect(() => {
    let sum = 0;
    Object.keys(cartDetails!).forEach((itemId) => {
      const item = cartDetails![itemId];
      sum += item.price * item.quantity;
    });

    setDiscount((prev: any) => ({...prev, couponPrice: sum}));
    setTotalPrice(sum);
  }, [cartDetails]); 

  return (
    <div className='w-full flex flex-col lg:flex-row items-center md:items-start justify-around gap-y-6 lg:gap-x-6 px-4 md:px-6 lg:px-8'>
      <div className='relative flex-col w-full lg:w-1/2'>
        <div className='mb-6 text-center lg:text-left flex flex-col gap-y-2'>
          <h3 className='text-gray-500 tracking-tight font-semibold'>Total</h3>
          <p className='text-3xl md:text-4xl lg:text-5xl font-semibold'>
            {totalPrice} ฿
          </p>
        </div>

        <ul className='divide-y divide-gray-200 overflow-scroll h-auto max-h-96 bg-gray-100 px-4 rounded-lg shadow-sm mb-6'>
          <div>
            {Object.values(cartDetails ?? {}).map((entry) => (
              <li key={entry.id} className='flex py-6'>
                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                  <Image
                    src={entry.image as string}
                    alt='Product image'
                    width={100}
                    height={100}
                  />
                </div>

                <div className='ml-4 flex flex-1 flex-col'>
                  <div>
                    <div className='flex justify-between text-base font-medium text-gray-900'>
                      <h3>{entry.name}</h3>
                      <p className='ml-4'>฿{entry.price}</p>
                    </div>
                    <p className='mt-1 text-sm text-gray-500 line-clamp-2'>
                      {entry.description}
                    </p>
                  </div>

                  <div className='flex flex-1 items-end justify-between text-sm'>
                    <p className='text-gray-500'>QTY: {entry.quantity}</p>
                    <div className='flex'>
                      <button
                        type='button'
                        className='font-medium text-primary hover:text-primary/80'
                        onClick={() => removeItem(entry.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </ul>

        <Button className='w-full'>
          <Link href='/stripe/success'>Pay Now</Link>
        </Button>
      </div>
      <div className='relative flex-col w-full xl:w-1/2 items-center xl:items-start'>
        <div className='mb-2 text-center lg:text-left flex flex-col gap-y-2'>
          <h3 className='text-gray-500 tracking-tight font-semibold'>
            Apply the coupon
          </h3>
        </div>

        <div className='flex flex-col items-center justify-between gap-8 md:flex-row mb-4 md:mb-6 lg:mb-8'>
          <div className='w-full flex flex-col items-center md:items-start'>
            <div className='flex mb-6 h-12 w-full md:w-96 divide-x overflow-hidden rounded-lg border'>
              <div
                className={`flex w-1/2 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 ${
                  shouldFixedOrPercent ? 'bg-gray-200' : ''
                }`}
                onClick={() => setShouldFixedOrPercent(true)}
              >
                Fixed Amount
              </div>
              <div
                className={`flex w-1/2 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100  ${
                  !shouldFixedOrPercent ? 'bg-gray-200' : ''
                }`}
                onClick={() => setShouldFixedOrPercent(false)}
              >
                Percentage Discount
              </div>
            </div>

            <div>
              {shouldFixedOrPercent ? (
                <input
                  type='number'
                  className='border border-gray-100 h-9 w-96 rounded-lg px-3'
                  placeholder='Amount THB'
                  onChange={handleFixedAmount}
                />
              ) : (
                <input
                  type='number'
                  className='border border-gray-100 h-9 w-96 rounded-lg px-3'
                  placeholder='Percentage%'
                  onChange={handlePercentDiscount}
                />
              )}
            </div>
          </div>
        </div>

        {typingCoupon === true ? (
          <div>
            <div className='mb-2 text-center lg:text-left flex flex-col gap-y-2'>
              <h3 className='text-gray-500 tracking-tight font-semibold'>
                Apply the On Top
              </h3>
            </div>

            <div className='flex flex-col items-center justify-between gap-8 md:flex-row mb-4 md:mb-6 lg:mb-8'>
              <div className='w-full flex flex-col items-center md:items-start'>
                <div className='flex mb-6 h-12 w-full md:w-96 divide-x overflow-hidden rounded-lg border'>
                  <div
                    className={`flex w-1/2 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 ${
                      shouldCatOrPoint ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => setShouldCatOrPoint(true)}
                  >
                    Discount by Category
                  </div>
                  <div
                    className={`flex w-1/2 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100  ${
                      !shouldCatOrPoint ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => setShouldCatOrPoint(false)}
                  >
                    Discount by Point
                  </div>
                </div>

                <div>
                  {shouldCatOrPoint ? (
                    <div className='flex flex-col gap-y-2'>
                      <select
                        id='category'
                        name='category'
                        className='border border-gray-100 h-9 w-96 rounded-lg px-3'
                        onChange={handleCategoryType}
                      >
                        <option value=''></option>
                        <option value='Clothing'>Clothing</option>
                        <option value='Accessories'>Accessories</option>
                        <option value='Electronics'>Electronics</option>
                      </select>
                      <input
                        type='number'
                        className='border border-gray-100 h-9 w-96 rounded-lg px-3'
                        placeholder='Percentage%'
                        onChange={handleCategoryDiscount}
                      />
                    </div>
                  ) : (
                    <input
                      type='number'
                      className='border border-gray-100 h-9 w-96 rounded-lg px-3'
                      placeholder='Amount Point'
                      onChange={handlePointDiscount}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        {typingOnTop === true ? (
          <div>
            <div className='mb-2 text-center lg:text-left flex flex-col gap-y-2'>
              <h3 className='text-gray-500 tracking-tight font-semibold'>
                Apply the On Special Campaigns
              </h3>
            </div>

            <div className='flex flex-col items-center justify-between gap-8 md:flex-row mb-4 md:mb-6 lg:mb-8'>
              <div className='w-full flex flex-col items-center md:items-start'>
                <div className='flex mb-6 h-12 w-full md:w-96 divide-x overflow-hidden rounded-lg border'>
                  <div
                    className={`flex w-96 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 bg-gray-200`}
                  >
                    Discount by Seasonal
                  </div>
                </div>

                <div className='flex flex-col items-start gap-y-2'>
                  <input
                    type='number'
                    className='border border-gray-100 h-9 w-96 rounded-lg px-3'
                    placeholder='Amount THB'
                    onChange={handleChangeEveryBath}
                  />
                  {discountBath !== 0 && discountBath !== '' && (
                    <input
                      type='number'
                      className='border border-gray-100 h-9 w-96 rounded-lg px-3'
                      placeholder='Every THB'
                      onChange={handleSpecialCampaigns}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Buynow
