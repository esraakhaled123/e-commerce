// import React from 'react'


// import getAllproducts from '@/api/products.api';

// import { ProductType } from '@/Types/product';
// import Singleproduct from '../singleproduct/Singleproduct';
// export default async function Allproducts() {
//     const data = await getAllproducts()
//     console.log(data);
    
//    return (
//  <div className="container py-4">
//        <div className='grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 proud'>
//             {
//                 data?.map((product:ProductType)=>
                
//                     ( <Singleproduct key={product.id}  product ={product}/>)
//                 )
//             }
//     </div>
//  </div>
//   )
// }

// Allproducts.tsx
import React from 'react'
import { ProductType } from '@/Types/product'
import Singleproduct from '../singleproduct/Singleproduct'

export default function Allproducts({ products }: { products: ProductType[] }) {
  return (
   <div className='container my-10'>
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 proud ">
      {products?.map((product) => (
        <Singleproduct key={product._id} product={product} />
      ))}
    </div>
   </div>
  )
}
