
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
import cashPayment from '@/checkoutactions/cashorder'
import { useRouter } from 'next/navigation'

export default function Checkout() {
const router = useRouter()

  const {id }:{id:string} = useParams()
  console.log(id);
  

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
    city:'',
    paymentmetod:'cash'

    
},
resolver:zodResolver(checkoutSchema)
  })

async function handelCheckout(values:checkoutSchemaType ): Promise<void> {
 console.log(values);
if(values.paymentmetod === 'card'){
 const resp = await payment(id ,'' ,values)
 console.log(resp);
 if(resp.status==="success"){
  window.location.href=resp.session.url
 }else{
  toast.error('something  wrong')
 }
 return
}
 if (values.paymentmetod === 'cash') {
  
    const resp = await cashPayment(id,values);
    console.log(resp);

    if (resp.status === "success") {
      toast.success('Payment successful');
      router.push('/allorders');
    } else {
      toast.error(resp.message || 'Cash payment failed');
    }
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
        <FormMessage className='m-2' />
      </FormItem>
    )}
  />
   ))}
    
<FormField 
  control={form.control}
  name="paymentmetod"
  render={({ field }) => (
    <FormItem className="space-y-3 ">
      <FormLabel className='text-main my-4'>payment method</FormLabel>
      <FormControl>
        <div className="flex flex-col gap-y-1 mb-4 ">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="cash"
              checked={field.value === 'cash'}
              onChange={field.onChange}
            />
            <span>cash</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="card"
              checked={field.value === 'card'}
              onChange={field.onChange}
            />
            <span>card</span>
          </label>
        </div>
      </FormControl>
      <FormMessage className='m2' />
    </FormItem>
  )}
/>



   
   <Button  className='bg-main cursor-pointer w-full hover:bg-blue-900'>pay now</Button>
 </form>
  
</Form>
  
  </div>
  </>
  
}
