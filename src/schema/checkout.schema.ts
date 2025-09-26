

import * as z from 'zod'

export const checkoutSchema = z.object({
       
    details:z.string().nonempty('this feild is required'),
     phone:z.string().regex(/^01[0125][0-9]{8}$/),
    city:z.string().nonempty('this feild is required').min(6,'min lenght is 6'),
  
})


export type checkoutSchemaType = z.infer<typeof checkoutSchema>