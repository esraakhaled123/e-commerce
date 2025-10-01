
import addBrand from '@/api/brandsAPI/AddBrand'
import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import { BrandType } from '@/Types/brand.type'

export default async function Brands() {
  const data = await  addBrand()
  console.log(data);
  
  return <>
  <div className='container my-10'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 proud">
       {data?.map((product:BrandType) => (
         <Card key={product._id} className='text-center gap-2 p-3  '>
  <Link href={`/brands/${product._id}`}>
  <CardHeader>
     
   <CardTitle className="flex justify-center">
  <Image
    src={product.image}
    alt="image"
    width={100}
    height={100}
    className="object-contain"
  />
</CardTitle>

  
                            

    <CardDescription className='text-main'>{product.name}</CardDescription>
    
  </CardHeader>
 
 
 </Link> 
 

</Card>
       ))}
     </div>
    </div>
  </>
}
