import { AuthOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Brands() {
  const data = await getServerSession(AuthOptions)
  console.log(data);
  
  return <>
  <h1>brands</h1>
  </>
}
