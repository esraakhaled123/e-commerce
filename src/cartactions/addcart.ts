"use server" //even if i call it in client it will be still processed in server

import getmytoken from "@/utilities/getmytoken"


export default async function AddToCart(id:string){
   const token = await getmytoken()
   if(!token){
    throw new Error("login to be able to add carts")
   }
 const resp = await   fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
        method:'post',
       headers:{
        token,
        "Content-Type":"application/json"

       },
       body:JSON.stringify({productId:id})
    })
    const bla = await resp.json()
   
    return bla
    
}