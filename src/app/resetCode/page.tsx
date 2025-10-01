'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { resetcodeschema, ResetcodeType } from '@/schema/resetcode'
import resetCode from '@/api/authontication/resetcode'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'

export default function ResetCode() {
     const [loading, setLoading] = React.useState(false)
const router = useRouter()
  const form = useForm<ResetcodeType>({
    defaultValues: {
      resetCode: '',
    },
    resolver: zodResolver(resetcodeschema)
  })

  async function handleresetCode(values: ResetcodeType): Promise<void> {
    setLoading(true) 
   
      const res = await resetCode(values.resetCode)
      console.log(values.resetCode);
      
      if (res?.status) {
  toast.success(res.status)
  setLoading(false)
   router.push('/resetpassword')
} else {
  toast.error("Reset code is invalid or has expired")
  setLoading(false)
}
    
  }

  return (
     <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 ">
    

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleresetCode)} className="space-y-4">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-main">Reset Code :</FormLabel>
                  <FormControl>
                      <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
    "verfiy code"
  )}
</Button>
        
          </form>
        </Form>
      </div>
    </section>
  )
}

