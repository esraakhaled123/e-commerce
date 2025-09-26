
'use client'
import React from 'react'

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { registerSchema, registerType } from '@/schema/registerscema.'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"

import { useRouter } from 'next/navigation'
export default function Register() {
 const router = useRouter()
  const forms: { title: RegisterField; label: string; type: string }[]=[
    {
      title:'name',
      label:'enter your name',
      type:'text'
    },
    {
      title:'email',
      label:'enter your email',
      type:'email'
    },
    {
      title:'password',
      label:'enter your password',
      type:'password'
    },
    {
      title:'rePassword',
      label:'confirm rePassword',
      type:'password'
    },
     {
      title:'phone',
      label:'enter your phone',
      type:'tel'
    },
    
    
  ]
  const form =useForm<registerType>({
    defaultValues:{
    name: '',
    email:'',
    password:'',
    rePassword:'',
    phone:''
},
resolver:zodResolver(registerSchema)
  })

async function handelRegister(values: registerType): Promise<void> {
  console.log( values);
  try {
    const resp = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), 
    });

    const data = await resp.json();
    console.log( data);

 if (resp.ok && data.message === "success") {
      toast.success("Account created successfully ",{position:'top-center' ,duration:3000 });
      router.push('/login')
    } else {
      toast.error(data.message,{position:'top-center' ,duration:3000 }); 
    }
  
   
  } catch (err) {
    toast.error("Network error, please try again later");
    console.error(err);
  }

}
type RegisterField = keyof registerType;

  return <>
  <div className="container my-10">
  <h1 className='text-main text-3xl text-center font-semibold'>register now</h1>
     <Form {...form} >
      
 <form onSubmit={form.handleSubmit(handelRegister)}>
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
   <Button className='bg-main cursor-pointer hover:bg-main'>register</Button>
 </form>
  
</Form>
  
  </div>
  </>
  
}
