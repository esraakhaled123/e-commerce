import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
 
} from "@/components/ui/card"
import Link from 'next/link'

import { BrandType } from '@/Types/brand.type'
export default function Subcategory({product}:{product :BrandType}) {
  return <>
  <div >
 <Card className='text-center gap-2 p-3  '>
  <Link href={`/products/${product._id}`}>
  <CardHeader>
  

    <CardDescription >{product.name}</CardDescription>
    
  </CardHeader>
 
 </Link> 
   

</Card>
                    </div>
  </>
}
