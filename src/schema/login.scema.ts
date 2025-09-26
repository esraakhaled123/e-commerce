
import * as z from 'zod'

export const loginSchema = z.object({
       
    email:z.email().nonempty('this feild is required'),
    password:z.string().nonempty('this feild is required').min(6,'min lenght is 6'),
  
})


export type loginType = z.infer<typeof loginSchema>