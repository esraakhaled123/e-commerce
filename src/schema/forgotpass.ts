
import * as z from 'zod'

export const forgotPasswordSchema = z.object({
       
    email:z.email().nonempty('this feild is required'),
  
})


export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>