import getAllCategories from '@/api/AllCategories'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandType } from '@/Types/brand.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Categories() {
  const data = await getAllCategories()
  console.log(data);
  
  return <>
<div className='container my-10'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 proud">
       {data?.map((product:BrandType) => (
         <Card key={product._id} className='text-center gap-2   '>
  <Link href={`/categories/${product._id}`}>
  <CardHeader className="flex flex-col items-center">
  <div className="w-full h-40 flex justify-center items-center">
    <Image
      src={product.image}
      alt="image"
      width={150}
      height={150}
      className="object-contain max-h-full"
    />
  </div>

  <CardDescription className="text-main mt-2">
    {product.name}
  </CardDescription>
</CardHeader>

 
 
 </Link> 
 

</Card>
       ))}
     </div>
    </div>
  
  </>
}
