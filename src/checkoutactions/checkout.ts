'use server'

import { checkoutSchemaType } from "@/schema/checkout.schema"
import getmytoken from "@/utilities/getmytoken"




export default async function payment(cartId:string , url=process.env.NEXTAUTH_URL , formValues:checkoutSchemaType) {
    const token = await getmytoken()
    if(!token) throw new Error('login first ')
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
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