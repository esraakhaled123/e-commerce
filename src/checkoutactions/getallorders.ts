'use server'



export default async function getallorders() {
   
           try {
            const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`)
            const data =await resp.json()
            return data.user.id
           } catch  {
            console.log('try aain');
            
           }
}