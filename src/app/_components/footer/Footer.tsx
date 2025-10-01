import Link from 'next/link'
import React from 'react'
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return <>
    <section className='bg-main '>
         <div className=' container pt-10 pb-5 text-white grid  gap-y-5 md:grid-cols-4'>
               <div className='flex flex-col gap-1 capitalize'>
                <h1 className='text-xl mb-3'>freshcart</h1>
                <span>subscribe</span>
                <p>get 10% of your first order</p>
               </div>

               <div>
                <h1 className='text-xl capitalize mb-3'>support</h1>
                <p> ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <a href="mailto:esraakhaledharfoush@gmail.com">esraakhaledharfoush@gmail.com</a>

               </div>
               <div className='capitalize flex flex-col gap-y-2 mb-3'>
                <h1>account</h1>
                <p><Link href={'/login'} >login</Link> / <Link className='cursor-pointer' href={'/register'}>register</Link> </p>
                <Link href={'/cart'}>cart</Link>
                <Link href={'/wishlist'}>wishlist</Link>
               </div>

                <div className='capitalize flex flex-col gap-y-2'>
                <h1>quick link</h1>
                <p>privacy policy</p>
                
                <div className='flex gap-4 items-center '>
      
    
      <a href="mailto:esraakhaledharfoush@gmail.com">
        <FaEnvelope size={22}  />
      </a>

   
      <a href="https://www.facebook.com/profile.php?id=100057002292614" target="_blank">
        <FaFacebook size={22} />
      </a>

    
      <a href="https://www.linkedin.com/in/esraa-khaled-90331a25a/" target="_blank">
        <FaLinkedin size={22} />
      </a>

      
      <a href="https://www.instagram.com/esraa_khaled260/?hl=en" target="_blank">
        <FaInstagram size={22} />
      </a>
    </div>
  
               </div>
         </div>
         <p className='capitalize  py-2 text-slate-300 text-center'>@copyright esraa khaled 2025,all right reserved</p>
    </section>
  </>
}
