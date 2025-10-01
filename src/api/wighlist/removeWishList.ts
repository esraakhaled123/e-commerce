

'use server'
import getmytoken from "@/utilities/getmytoken"



export default async function removeWishList(id:string){
    const token = await getmytoken()
      if(!token){
       throw new Error("login to be able to add carts")
    
      }
      console.log(token);
      
    const resp = await   fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
           method:'delete',
          headers:{
           token,
           "Content-Type":"application/json"
   
          }
          
       })
       const bla = await resp.json()
      console.log(bla);
      
       return bla
       
    
}