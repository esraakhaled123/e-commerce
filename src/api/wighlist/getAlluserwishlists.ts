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
  const data = await respo.json() 
  console.log(data);
return data
}

