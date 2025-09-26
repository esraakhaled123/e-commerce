"use server"
import getmytoken from "@/utilities/getmytoken"


export default async function removeItem(id:string){
    const token = await getmytoken()
           if(!token){
            throw new Error("not authorized")
           }
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        method:"delete",
                headers:{
            token,
"Content-Type":"application/json"
        }
     })
    
     const data=await resp.json()
     console.log(data);
     
    return data
   
}

