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
import { FaStar } from 'react-icons/fa'
import Addtocartbtn from '../addtocartbtn/Addtocartbtn'
import { ProductType } from '@/Types/product'
export default function Singleproduct({product}:{product :ProductType}) {
  return <>
  <div >
 <Card className='text-center gap-2 p-3  '>
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

  
                              {/* <CardAction className='mx-10'> <FaHeart/></CardAction> */}

    <CardDescription >{product.category?.name}</CardDescription>
    
  </CardHeader>
  <CardContent >
    <p className='text-main line-clamp-1'> {product.title}</p>
  </CardContent>
  <CardFooter className='flex justify-between items-center'>
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
