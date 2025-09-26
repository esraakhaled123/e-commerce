// import React from 'react'
// import getAllproducts from '@/api/products.api';
// import Allproducts from '../_components/Allproducts/Allproducts';

// export default async function Products() {
//   const data = await getAllproducts();
//         console.log(data);
        
//   return (
//     <Allproducts  />
//   )
// }

import React from 'react'
import getAllproducts from '@/api/products.api';
import Allproducts from '../_components/Allproducts/Allproducts';

export default async function Products() {
  const data = await getAllproducts();

  return (
   <div className='container'>
     <Allproducts products={data} />
   </div>
  )
}
