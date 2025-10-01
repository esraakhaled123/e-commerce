

import verifyToken from "@/api/verifytoken"
  
export default async function getUserOrders() {
   const id =await verifyToken() 
           try {
            const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            const data =await resp.json()
            
            
            return data
           } catch  {
            console.log('try aain');
            
           }
}