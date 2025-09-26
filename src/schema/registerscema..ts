
import * as z from 'zod'

export const registerSchema = z.object({
        name: z.string().nonempty('this feild is required').min(2,'min lenght is 2').max(20,'max lenght is 20'),
    email:z.email().nonempty('this feild is required'),
    password:z.string().nonempty('this feild is required').min(6,'min lenght is 6'),
    rePassword:z.string().nonempty('this feild is required').min(6,'min lenght is 6'),
    phone:z.string().regex(/^01[0125][0-9]{8}$/)
}).refine((object)=>object.password===object.rePassword,
{
    path:['rePassword'],
    error:'password && repassord not match'
}

)
export type registerType = z.infer<typeof registerSchema>