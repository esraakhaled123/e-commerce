
import * as z from 'zod'

export const resetcodeschema = z.object({
       
    resetCode:z.string().nonempty('this feild is required'),
  
})


export type ResetcodeType = z.infer<typeof resetcodeschema>