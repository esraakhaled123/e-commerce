

'use server'


import getmytoken from "@/utilities/getmytoken"



export  default async function updateItem(id:string,count:string){
 const token = await getmytoken()
           if(!token){
            throw new Error("not authorized")
           }
const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        method:"put",
         headers:{
            token,
"Content-Type":"application/json"
        },body:JSON.stringify({count:count})
     })
   const data= await resp.json()
     console.log(data);
     
    return data
   
}