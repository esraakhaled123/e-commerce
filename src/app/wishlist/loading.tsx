
import React from 'react'
import { RiLoader2Fill } from 'react-icons/ri'

export default function loading() {
  return <>
  <div className='text-main flex h-screen items-center justify-center'>
<RiLoader2Fill className='animate-spin text-6xl'/>
  </div>
  
  </>
}
