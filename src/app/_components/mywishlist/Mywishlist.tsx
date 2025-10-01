'use client' 

import addWishList from '@/api/wighlist/addwishlist';
import getuserWishlists from '@/api/wighlist/getAlluserwishlists';
import removeWishList from '@/api/wighlist/removeWishList';

 import React, { useEffect, useState } from 'react' 
 import { FaHeart, FaRegHeart } from 'react-icons/fa' 
import { toast } from 'sonner';
 export default  function Mywishlist({ id, initialLike }: { id: string, initialLike: boolean } ) { 
      const [isLiked, setIsLiked] = useState(initialLike);
     
    async function getMyWhishlists (id:string) {
        try {
      
          if(!isLiked){
              const resp = await addWishList(id)
            console.log(resp); 
             console.log(id); 
             if(resp.status == 'success'){
                toast.success(resp.message)
                setIsLiked(true)
               
             }else{
               toast.error(resp.message)
             }
          } else{
            const resp = await removeWishList(id)
            console.log(resp); 
             console.log(id); 
             if(resp.status == 'success'){
                toast.success('removed successfuly')
                 setIsLiked(false)
                 
                 
             }else{
               toast.error(resp.statusMsg )
             }
          }
            }
      catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message)
  } else {
    toast.error("Operation failed")
  }
}

        }
        
useEffect(() => {
  getuserWishlists()

}, [])
   
        return<>
        
 {isLiked ? 
 <FaHeart
 onClick={()=>getMyWhishlists(id)} 
 className='cursor-pointer text-red-500'/> 
:  (
        <FaRegHeart
          onClick={()=>getMyWhishlists(id)}
          className="cursor-pointer text-gray-400"
        />)}
    
    
    </> }