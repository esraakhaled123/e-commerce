import React from 'react'
import {
  Card,
 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'

import Addtocartbtn from '../addtocartbtn/Addtocartbtn'
import { ProductType } from '@/Types/product'
import getuserWishlists from '@/api/wighlist/getAlluserwishlists';

import Mywishlist from '../mywishlist/Mywishlist'
import { FaStar } from 'react-icons/fa'
export default function Singleproduct({product, isLiked}:{product :ProductType, isLiked: boolean}) {
  return <>
  <div >
 <Card className=' gap-1 p-3 text-center '>
  <div className=" flex justify-end ">
 <div className='flex items-center justify-center size-8 border-2  border-blue-200 rounded-full'>
  <Mywishlist id= {product._id} initialLike={isLiked}/>
 </div>
</div>

  <Link href={`/products/${product.id}`}>
 
  <CardHeader>
    
<CardTitle className="flex   justify-center">
 
  <Image
    src={product.imageCover}
    alt="image"
    width={100}
    height={100}
    className="object-contain"
  />
</CardTitle>



    <CardDescription >{product.category?.name}</CardDescription>
    
  </CardHeader>
  <CardContent >
    <p className='text-main line-clamp-1'> {product.title}</p>
  </CardContent>
  <CardFooter className='flex justify-between  items-center'>
      <span className='text-red-500'>
        {product.price}EGP
      </span>
      <span className='flex items-center'>
        {product.ratingsQuantity} <FaStar className='inline-flex  text-main' />
      </span>
  </CardFooter>
 </Link> 
   <Addtocartbtn id={product._id}/>

</Card>
                    </div>
  </>
}
