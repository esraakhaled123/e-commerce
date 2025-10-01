


import getmytoken from "@/utilities/getmytoken"
  
export default async function verifyToken() {
    
const token = await getmytoken()
      if(!token){
       throw new Error("login to be able to access")
    
      }
      console.log(token);
      
    const resp = await   fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,{
        
          headers:{
           token,
          }
          
       })
       const data = await resp.json()
      console.log(data);
      console.log(data.decoded.id);
      
       return data.decoded.id
         
}