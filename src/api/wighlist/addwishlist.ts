

'use server'
import getmytoken from "@/utilities/getmytoken"


export default async function addWishList(id:string){
    const token = await getmytoken()
      if(!token){
       throw new Error("login to be able to add carts")
      }
      console.log(token);
      
    const resp = await   fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
           method:'post',
          headers:{
           token,
           "Content-Type":"application/json"
   
          },body:JSON.stringify({productId:id})
          
       })
       const bla = await resp.json()

      console.log(bla);
      console.log(bla);
      
       return bla
       
    
}