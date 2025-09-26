import getAllCategories from '@/api/AllCategories'
import React from 'react'
import Swipercategory from '../swioerCateogry/Swipercategory'


export default async function Categoryslider() {
  const data = await getAllCategories()
  return (
    <div>
     
     <Swipercategory data={data}/>
    </div>
  )
}
