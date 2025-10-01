
'use client'
import React from 'react'

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


import { loginSchema, loginType } from '@/schema/login.scema'
import { signIn } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Login() {
  const [loading, setLoading] = React.useState(false)
const router = useRouter()
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
  setLoading(true) 
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
    setLoading(false) 
  }else{
    toast.error(resp?.error)
    setLoading(false) 
  }


}
  return <>
 <div className="container my-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10">

  {/* ✅ الصورة */}
  <div className="flex justify-center">
     <Image
          className="w-1/2 object-cover"
          src="/images/Sign up-pana.svg"
          alt="a333"
          width={50}
          height={50}
        />
  </div>

  {/* ✅ الفورم */}
  <div className="w-full">
    <h1 className="text-main text-3xl text-center font-semibold uppercase mb-6">
      login now
    </h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(handelRegister)}>
        {forms.map((x, index) => (
          <FormField
            key={index}
            control={form.control}
            name={x.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-main">{x.label}</FormLabel>
                <FormControl>
                  <Input
                    type={x.type}
                    {...field}
                    className="outline-none"
                  />
                </FormControl>
                <FormMessage className="mb-2" />
              </FormItem>
            )}
          />
        ))}

        <Button
          className="bg-main hover:bg-main w-32 flex justify-center cursor-pointer mt-4"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <button
        type="button"
        onClick={() => router.push('/forgotpassword')}
        className="text-sm text-main hover:underline mt-4 cursor-pointer"
      >
        Forgotten Password?
      </button>
    </Form>
  </div>

</div>

  </>
  
}
