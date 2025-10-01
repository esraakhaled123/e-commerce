
'use client'

import getuserWishlists from '@/api/wighlist/getAlluserwishlists';

import Image from 'next/image';
import React, { useEffect, useState } from 'react'

import { ProductType } from '@/Types/product';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Mywishlist from '../_components/mywishlist/Mywishlist';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import Addtocartbtn from '../_components/addtocartbtn/Addtocartbtn';
import { LuLoaderCircle } from "react-icons/lu";



export default function Wishlist() {
   const [product, setProduct] = useState<ProductType[]>([])
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  

 const [loading, setLoading] = useState(true)


     async function getloggeduserwishlist() {
  try {
    const { data } = await getuserWishlists()
      setProduct(data)
     setWishlistIds(data.map((item: ProductType) => item._id));
    
  } finally {
    setLoading(false)
  }
}


   useEffect(() => {
      
       getloggeduserwishlist()
      
    }, [wishlistIds])
if (loading) {
  return (
    <div className="flex h-screen items-center justify-center text-main">
      <LuLoaderCircle className="animate-spin text-4xl" /> 
    </div>
  );
}

return (
  <>
    <div className='container my-10'>

      {product?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 proud">
          {product.map((product) => (
            <Card key={product._id} className="gap-1 p-3 text-center">
              <div className="flex justify-end">
                <div className="flex items-center justify-center size-8 border-2 border-green-200 rounded-full">
                  <Mywishlist id={product._id} initialLike={wishlistIds.includes(product._id) 
                   }

                  
 />
                </div>
              </div>

              <Link href={`/products/${product.id}`}>
                <CardHeader>
                  <CardTitle className="flex justify-center">
                    <Image
                      src={product.imageCover}
                      alt="image"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </CardTitle>
                  <CardDescription>
                    {product.category?.name}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-main line-clamp-1">{product.title}</p>
                </CardContent>

                <CardFooter className="flex justify-between items-center">
                  <span className="text-red-500">{product.price} EGP</span>
                  <span className="flex items-center">
                    {product.ratingsQuantity}
                    <FaStar className="inline-flex text-main" />
                  </span>
                </CardFooter>
              </Link>

              <Addtocartbtn id={product._id} />
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center text-gray-400 text-3xl font-semibold italic">
          wishlist is empty
        </div>
      )}

    </div>
  </>
);

}
