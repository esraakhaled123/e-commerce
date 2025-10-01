import Image from 'next/image'
import React from 'react'

export default function Notfound() {
  return<>
  <div>
   <div className=" h-screen flex items-center justify-center">
  <Image
    src="/images/404 Error Page not Found with people connecting a plug-bro (1).svg"
    alt="error"
   width={500}
   height={500}
    className="object-cover"
  />
</div>


  </div>
  </>
}
