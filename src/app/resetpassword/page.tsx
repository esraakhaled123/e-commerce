'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'



import { resetpasswordschema, resetpasswordType } from '@/schema/resetpassword'
import { Input } from '@/components/ui/input'
import resetPass from '@/api/authontication/resetPass'

export default function Resetpassword() {
     const [loading, setLoading] = React.useState(false)
const router = useRouter()
  const form = useForm<resetpasswordType>({
    defaultValues: {
      email: '',
      newPassword:''
    },
    resolver: zodResolver(resetpasswordschema)
  })

  async function handelresetPassword(values: resetpasswordType): Promise<void> {
    setLoading(true) 
   
      const res = await resetPass(values.email , values.newPassword)
     
      console.log(res);
      
      if (res?.statusMsg !== 'fail') {
  toast.success('success')
  setLoading(false)
   router.push('/login')
} else {
  toast.error("this email is not exist")
  setLoading(false)
}
    
  }

  return (
     <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 ">
    

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handelresetPassword)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-main">your email :</FormLabel>
                  <FormControl>
            <Input  {...field} 
            placeholder='enter your email '
            />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-main">enter new password :</FormLabel>
                  <FormControl>
            <Input  {...field} 
             placeholder='*******'
            />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <Button
  disabled={loading}
  className=" capitalize bg-main hover:bg-main/90 text-white cursor-pointer  flex justify-center"
>
  {loading ? (
    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
  ) : (
    "save changes"
  )}
</Button>
        
          </form>
        </Form>
      </div>
    </section>
  )
}

