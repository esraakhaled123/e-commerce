

import * as z from 'zod'

export const checkoutSchema = z.object({
       
    details:z.string().nonempty('this feild is required'),
     phone:z.string().regex(/^01[0125][0-9]{8}$/),
    city:z.string().nonempty('this feild is required').min(6,'min lenght is 6'),
   paymentmetod: z
  .enum(['cash', 'card'])
  .refine((val) => val === 'cash' || val === 'card', {
    message: 'payment method is required',
  }),
})


export type checkoutSchemaType = z.infer<typeof checkoutSchema>