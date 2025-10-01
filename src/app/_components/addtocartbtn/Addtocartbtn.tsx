
'use client'
import AddToCart from '@/cartactions/addcart'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/cartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'

export default  function Addtocartbtn({id}:{id:string}) {
 const {numberOfCarts ,setNumberOfCarts} = useContext(CartContext)!
   async function checkAddproduct(id:string){
   try {
       const resp = await  AddToCart(id)
      //  console.log(resp);
      //  if(resp.status=='success'){
      //    toast.success("added to cart successfly")
      //    setNumberOfCarts(numberOfCarts + 1)
      //  }else{
      //     toast.success("can't add this product")
      //  }
        const res = await AddToCart(id);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success("Added to cart successfully");
  

   } catch (error) {
  console.log(error);
  const err = error as Error;  // مش فاهمه ليه 
  toast.error(err.message);

}
    }
  return (
    <div>
<Button onClick={()=>checkAddproduct(id)} className='cursor-pointer capitalize bg-main hover:bg-blue-700 w-full my-2' >add to cart</Button>

    </div>
  )
}
