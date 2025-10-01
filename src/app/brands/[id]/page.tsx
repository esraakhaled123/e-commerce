

import singleBrand from '@/api/brandsAPI/specificbrand'
import Image from 'next/image';
import React from 'react'
import {
  Card,
 
  CardDescription,

  CardHeader,

} from "@/components/ui/card"

export default async function BrandDetails({ params }: { params: { id: string } }) {
    const {id}:{id:string} =   params
   const data = await  singleBrand(id)
   console.log(data);
   
  return <>
 <div className="  flex items-center justify-center mt-10">
  <Card className="text-center p-4 w-1/2 lg:w-1/3 ">
    <CardHeader className="flex flex-col items-center">
      <Image
        src={data.image}
        alt="image"
        width={300}
        height={300}
        className="object-contain"
      />
      <CardDescription className="mt-1 text-lg text-main font-medium">
        {data?.name}
      </CardDescription>
     
    </CardHeader>
  </Card>
</div>

</>

}
