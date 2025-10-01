'use server'

import { checkoutSchemaType } from "@/schema/checkout.schema"
import getmytoken from "@/utilities/getmytoken"




export default async function cashPayment(cartId:string , formValues:checkoutSchemaType) {
    const token = await getmytoken()
    if(!token) throw new Error('login first ')
        console.log(token);
        
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
    method:'post',
    headers:{
        token,
         "Content-Type":"application/json"
    },
    body:JSON.stringify({shippingAddress:formValues})

    }
    
    )
    const data = resp.json()
    return data
}