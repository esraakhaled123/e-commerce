'use client'

import React from 'react'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Category } from '@/Types/product'
import Image from 'next/image'

export default function Swipercategory({data}:{data:Category[]}) {
  // console.log(data)

  return (
    <div className="container my-5">
        <h1 className='text-slate-500 font-semibold mb-2'>popular products</h1>
      <Swiper className=''
        spaceBetween={10}
        
        modules={[Navigation]}
        navigation={true}
        loop={true}
          breakpoints={{
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: { 
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1024: { 
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1280: { 
      slidesPerView: 7,
      spaceBetween: 20,
    },
  }}
      >
        {data?.map((cate:Category) => (
          <SwiperSlide key={cate._id}>
            <div className="w-full h-[150px]">
              <Image
                src={cate.image}
                alt={cate.name}
                className="w-full h-full object-cover rounded-md"
                width={100}
                height={100}
              />
            </div>
            <p className="text-center mt-2">{cate.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
