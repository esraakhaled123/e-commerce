"use client";

import React, { useContext, useState } from "react";
import image from "../../../../public/images/freshcart-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

import { CartContext } from "@/context/cartContext";

export default function Navbar() {
  
 const {numberOfCarts} =  useContext(CartContext)!

  const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession()

 console.log(session);
 console.log(status);
 
 function logOut():void {
  //الفانكشن دي بتمسح السيشن
  signOut({callbackUrl:'/login'})
 }
  const links = [
    { name: "home", href: "/"},
    { name: "cart", href: "/cart" },
    { name: "products", href: "/products" },
    { name: "categories", href: "/categories" },
    { name: "brands", href: "/brands" },
  ];

const specificlinks = session? links :links.filter((link)=> link.name !=='cart')

  return (
    <nav className="bg-emerald-500 text-white">
      <div className="container w-full mx-auto lg:w-[80%] p-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image src={image} alt="logo" className="w-[100px] h-auto" />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex gap-8 items-center">
            {specificlinks.map((link, index) => (
              <li key={index}>
                <Link className="relative" href={link.href}>
                
                {link.name}

                {/* عشان عدد الكارتس */}
                {link.name === 'cart'&& numberOfCarts !== 0 &&(<span 
                className="absolute top-[-13px] end-[-10px] size-5 rounded-full bg-[#232F3E] text-main flex justify-center items-center">
                  {numberOfCarts}
                  </span>)}
                
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        
        {!session ? (
  <div className="hidden lg:flex gap-8">
    <Link href="/register">register</Link>
    <Link href="/login">login</Link>
  </div>
) : (
  <div className="hidden lg:flex gap-8">
    <span onClick={logOut}>logout</span>
    <p>{session?.user.name}</p>
  </div>
)}


        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes className="cursor-pointer" size={24} /> : <FaBars className="cursor-pointer" size={24} />}
          </button>
        </div>
      </div>

    {/* Mobile Dropdown Menu */}
{isOpen && (
  <div className="lg:hidden bg-emerald-600 px-4 py-3">
    <ul className="flex flex-col gap-4">
      {specificlinks.map((link, index) => (
        <li key={index}>
          <Link href={link.href} onClick={() => setIsOpen(false)}>
            {link.name}
          </Link>
        </li>
      ))}

      {!session ? (
        <>
          <li>
            <Link href="/register" onClick={() => setIsOpen(false)}>
              register
            </Link>
          </li>
          <li>
            <Link href="/login" onClick={() => setIsOpen(false)}>
              login
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <span
    onClick={() => {
      setIsOpen(false);
      logOut();
    }}
    className="cursor-pointer"
  >
    logout
  </span>
          </li>
        
        </>
      )}
    </ul>
  </div>
)}

    </nav>
  );
}
