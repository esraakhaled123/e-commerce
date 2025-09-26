'use server'

import getmytoken from "@/utilities/getmytoken";



export default async function getUserCart(){
       const token = await getmytoken()
         console.log(token);
       if(!token){
        throw new Error("not authorized")
       }
   
    
     const respo = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:{
            token,
"Content-Type":"application/json"
        }
     })
  const data = await respo.json() 
  console.log(data);
return data
}


