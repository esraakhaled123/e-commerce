

'use client'
import React, { useEffect, useState } from 'react'
import img1 from '../../../../../public/images/slider-image-1.jpeg'
import img2 from '../../../../../public/images/slider-image-2.jpeg'
import img3 from '../../../../../public/images/slider-image-3.jpeg'
import img5 from '../../../../../public/images/grocery-banner-2.jpeg'
import img6 from '../../../../../public/images/blog-img-2.jpeg'
import Image from 'next/image'

import { Autoplay} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import {
  SidebarProvider,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import getAllSubCategories from '@/api/subcategories/Allsubcateogries'
import { Link } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@radix-ui/react-scroll-area'


export default function Mainslider() {

  return (
   <div className="container py-4">
  <div className="grid grid-cols-1 md:grid-cols-6">
    
    {/* Slider */}
    <div className="col-span-1 md:col-span-4">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide>
          <Image
            className="w-full h-[250px] md:h-[350px] object-cover"
            src={img1}
            alt="a333"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full h-[250px] md:h-[350px] object-cover"
            src={img5}
            alt="a333"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full h-[250px] md:h-[350px] object-cover"
            src={img6}
            alt="a333"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    {/* Static Images */}
    <div className="hidden md:block md:col-span-2">
      <Image
        className="w-full h-[175px] object-cover"
        src={img2}
        alt="a333"
      />
      <Image
        className="w-full h-[175px] object-cover"
        src={img3}
        alt="a333"
      />
    </div>
  </div>
</div>

  )
}
   