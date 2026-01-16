'use server'

import getmytoken from "@/utilities/getmytoken";



export default async function getuserWishlists(){
       const token = await getmytoken()
      
       if(!token){
        // throw new Error("not authorized")
         return { message: "not authorized" }
       }
   
    
     const respo = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers:{
            token,

        }
     })
  try {
    const data = await respo.json() 
    return data
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return { status: "error", data: [] }
  }
}

