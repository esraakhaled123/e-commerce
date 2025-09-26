
'use client'
import React from 'react'

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"

import { useParams} from 'next/navigation'

import { checkoutSchema, checkoutSchemaType } from '@/schema/checkout.schema'
import payment from '@/checkoutactions/checkout'
export default function Checkout() {
  // hgeb id 
  const {id }:{id:string} = useParams()
  console.log(id);
  
//  const router = useRouter()


  const forms: { title: keyof checkoutSchemaType ; label: string; type: string }[]=[
   
    {
      title:'details',
      label:'details :',
      type:'text'
    },
    {
      title:'phone',
      label:'phone :',
      type:'tel'
    },  {
      title:'city',
      label:'city :',
      type:'text'
    },
    
    
  ]
  const form =useForm<checkoutSchemaType>({
    defaultValues:{
  
    details:'',
    phone:'',
    city:''
    
},
resolver:zodResolver(checkoutSchema)
  })

async function handelCheckout(values:checkoutSchemaType ): Promise<void> {
 console.log(values);
 const resp = await payment(id ,'' ,values)
 console.log(resp);
 if(resp.status==="success"){
  window.location.href=resp.session.url
 }else{
  toast.error('eee')
 }
}

  return <>
  <div className="w-1/2  lg:w-1/3 mx-auto my-10">
  <h1 className='text-main text-2xl lg:text-3xl text-center my-3 font-semibold'>checkout now</h1>
     <Form {...form} >
      
 <form onSubmit={form.handleSubmit(handelCheckout)}>
   {forms.map((x,index)=>(
   <FormField key={index}
    control={form.control}
    name={x.title}
    render={({field}) => (
      <FormItem>
        <FormLabel className='text-main'>{x.label}</FormLabel>
        <FormControl>
         <Input type={x.type} {...field} className='outline-none'/>
        </FormControl>
        <FormDescription />
        <FormMessage className='mb-2' />
      </FormItem>
    )}
  />
   ))}
   <Button  className='bg-main cursor-pointer w-full hover:bg-green-900'>pay now</Button>
 </form>
  
</Form>
  
  </div>
  </>
  
}
