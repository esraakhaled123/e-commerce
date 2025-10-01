

import Image from 'next/image';
import React from 'react'
import {
  Card,
 
  CardDescription,

  CardHeader,

} from "@/components/ui/card"
import categoryDetails from '@/api/specificCategory';

export default async function CategoryDetails({ params }: { params: { id: string } }) {
    const {id}:{id:string} =   params
   const data = await  categoryDetails(id)
   console.log(data);
    // const subcategories = await getAllSubCategories()
    // console.log(subcategories);
    
  return <>
 <div className='container'>
  <div className=" flex items-center justify-center mt-10">
  <Card className="text-center p-4 w-1/2 lg:w-1/3  ">
    <CardHeader className="flex flex-col items-center">
      <Image
        src={data.image}
        alt="image"
        width={200}
        height={100}
        className="object-contain"
      />
      <CardDescription className="mt-1 text-lg text-main font-medium">
        {data?.name}
      </CardDescription>
     
    </CardHeader>
  </Card>
</div>


{/* subcategories */}

{/* <div className='grid my-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 proud'>
            {
                subcategories.map((product:BrandType)=>
                
                    ( <Subcategory key={product._id}  product ={product}/>)
                )
            }
    </div> */}
 </div>

</>

}