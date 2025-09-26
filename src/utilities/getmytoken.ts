
'use server'

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export default async function getmytoken(){
  try {
    //ana 3ayza ageb el token w2t fl production ao local 
     //kda bgeb token mn cookies
    const decodedtoken = (await cookies()).get(`next-auth.session-token`)?.value || 
                         (await cookies()).get(`__Secure-next-auth.session-token`)?.value
      //more security 
             if(!decodedtoken) return null
 
   const token = await decode({token:decodedtoken,secret:process.env.NEXTAUTH_SECRET!}) //object carry token after tasgfer
 
   
    return token?.token || null
  }catch(err){
   console.log(err);
   return null
  }
}