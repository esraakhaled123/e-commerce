'use client'

import getUserOrders from '@/checkoutactions/getuserorder'
import { ordersType } from '@/Types/orders.type'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Allorders() {
  const [orders, setOrders] = useState<ordersType[]>([])

  async function getAllUserOrders() {
    const data = await getUserOrders()
    console.log(data)
    setOrders(data || [])
  }

  useEffect(() => {
    getAllUserOrders()
  }, [])

  return (
    <>
      <section className="max-w-5xl container  py-10">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 my-6 border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Order #{index + 1}
              </h3>
              <div className="grid grid-cols-1 gap-2 text-slate-700">
                <p>
                  <span className="font-medium text-main">Payment method:</span>{' '}
                  {order.paymentMethodType}
                </p>
                <p>
                  <span className="font-medium text-main">Total price:</span>{' '}
                  {order.totalOrderPrice}EGP
                </p>
                <p>
                  <span className="font-medium text-main">City:</span>{' '}
                  {order.shippingAddress?.city}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-slate-800 mb-2">Items:</h4>
                {order.cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-center  border-b py-3 last:border-b-0" 
                  >
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={70}
                      height={70}
                      className="rounded-md border"
                    />
                    <div className="text-slate-700">
                      <p className="font-semibold text-blue-700">
                        {item.product.title}
                      </p>
                      <p>peices: {item.count}</p>
                      <p>Price: {item.price} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="h-screen flex items-center justify-center text-xl text-slate-500">
            There are no orders yet
          </div>
        )}
      </section>
    </>
  )
}
