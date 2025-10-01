'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import forgotPass from '@/api/authontication/forgotpassword'
import { forgotPasswordSchema, ForgotPasswordType } from '@/schema/forgotpass'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
     const [loading, setLoading] = React.useState(false)
const router = useRouter()
  const form = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema)
  })

  async function handleForgot(values: ForgotPasswordType): Promise<void> {
    setLoading(true) 
   
      const res = await forgotPass(values.email)
      console.log(values.email);
      
      if (res?.statusMsg === "success") {
  toast.success(res.message || "Code sent to your email")
  setLoading(false)
  router.push('/resetCode')
} else {
  toast.error(res?.message || "oops")
  setLoading(false)
}
    
  }

  return (
     <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-center text-main mb-4 uppercase">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your email and we’ll send you reset instructions.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleForgot)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-main">Email Address :</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@email.com"
                    
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <Button
  disabled={loading}
  className="w-full capitalize bg-main hover:bg-main/90 text-white cursor-pointer flex justify-center"
>
  {loading ? (
    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
  ) : (
    "submit"
  )}
</Button>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full text-sm text-gray-600 hover:underline text-center mt-2 cursor-pointer"
            >
              ← Back to Login
            </button>
          </form>
        </Form>
      </div>
    </section>
  )
}

