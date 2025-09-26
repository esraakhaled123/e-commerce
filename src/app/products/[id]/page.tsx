

import ProductDetailsId from '@/api/productdid';

import React from 'react'
import { FaStar } from 'react-icons/fa';

import Image from 'next/image';
import { ProductType } from '@/Types/product';
import Addtocartbtn from '@/app/_components/addtocartbtn/Addtocartbtn';
import getRelatedProducts from '@/api/relatedproductactions';
import Singleproduct from '@/app/_components/singleproduct/Singleproduct';

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await  params
    
 const data:ProductType = await ProductDetailsId(id)
 if (!data) return <div className='flex h-screen items-center justify-center'>no products here</div>
 console.log(data.category._id);// id el montag eli ana feh
 
 const relatedproduct = await getRelatedProducts(data.category._id)
 
    console.log(relatedproduct);
    
  return (
    <div className='container capitalize'>
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 py-6">
  {/* الصورة */}
  <div className="md:col-span-2 flex justify-center md:justify-start">
    <Image
  src={data.imageCover}
  alt="bla"
  width={200}
  height={200}
  className="object-contain"
/>

  </div>

  <div className="md:col-span-4 flex flex-col justify-center space-y-3">
    <h1 className="font-bold text-2xl ">{data.title}</h1>
    <h2 className="text-gray-600 ">{data.description}</h2>
    <h1 className="text-main font-medium">{data.category.name}</h1>

    <div className="flex justify-between items-center">
      <span className="text-red-500 italic font-semibold">
        {data.price}$
      </span>
      <span className="flex items-center">
        {data.ratingsQuantity}
        <FaStar className="inline-flex mx-1 text-main" />
      </span>
    </div>

    <Addtocartbtn id={data._id} />
  </div>
</div>

<div className='grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 proud'>
            {
                relatedproduct.data?.map((product:ProductType)=>
                
                    ( <Singleproduct key={product.id}  product ={product}/>)
                )
            }
    </div>

      
    </div>
    
  )
}
