
import * as z from 'zod'

export const resetpasswordschema = z.object({
    email:z.email().nonempty('this feild is required'),
 
    newPassword:z.string().nonempty('this feild is required').min(6,'min lenght is 6'),
  
})


export type resetpasswordType = z.infer<typeof resetpasswordschema>