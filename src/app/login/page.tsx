
'use client'
import React from 'react'

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"


import { loginSchema, loginType } from '@/schema/login.scema'
import { signIn } from 'next-auth/react'

export default function Login() {
  
//  const router = useRouter()
 type RegisterField = keyof loginType;

  const forms: { title: RegisterField; label: string; type: string }[]=[
   
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
    
    
  ]
  const form =useForm<loginType>({
    defaultValues:{
  
    email:'',
    password:'',
    
},
resolver:zodResolver(loginSchema)
  })

async function handelRegister(values:loginType ): Promise<void> {
  console.log( values);
const resp = await signIn('credentials',{
    email:values.email,
    password:values.password,
    redirect:false,  //بيوقف انه يروح في اي حتة ساواء ف حالة النجاخ او الفشل 
    callbackUrl:'/'
  })
  console.log(resp);
  if (resp?.ok) {
    toast.success("loggin successfuly" )
    //عايزاه يروح للهوم ويعمل ريلود عشان السيشن بتاعة التوكن مش بتيجي غير لما اعمل ريلود
    window.location.href='/'
  }else{
    toast.error(resp?.error)
  }

//   try {
//     const resp = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values), 
//     });

//     const data = await resp.json();
//     console.log( data);

//  if (resp.ok && data.message === "success") {
//       toast.success("Account created successfully ",{position:'top-center' ,duration:3000 });
//       router.push('/')
//     } else {
//       toast.error(data.message,{position:'top-center' ,duration:3000 }); 
//     }
  
   
//   } catch (err) {
//     toast.error("Network error, please try again later");
//     console.error(err);
//   }

}

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
   <Button className='bg-main cursor-pointer hover:bg-main'>Login</Button>
 </form>
  
</Form>
  
  </div>
  </>
  
}
