
'use client'
import getUserCart from '@/cartactions/getUserCart';
import removeItem from '@/cartactions/removecartitems';
import updateItem from '@/cartactions/updateItem';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { RiLoader2Fill } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import clearAllCarts from '@/cartactions/clearallcarts';
import { CartContext } from '@/context/cartContext';
import { cartProductType } from '@/Types/cart.type';
import Link from 'next/link';

export default  function Cart() {
const [product, setProduct] = useState<cartProductType[]>([])
const [isloading, setIsloading] = useState(true)
const [isdisable, setIsdisable] = useState(false)
const [loadingcart, setLoadingcart] = useState(false)
const [currentid, setcurrentid] = useState("")
const [removingId, setRemovingId] = useState<string | null>(null);
const [total, setTotal] = useState<number>(0)   
const [cartID, setcartID] = useState<string>('')   

const context= useContext(CartContext)
if(!context) throw new Error('not  authorized')
const {numberOfCarts ,setNumberOfCarts}=context

  async function getLoggedUsercart(){
     try {
      const resp = await getUserCart()
      if (resp.status=='success') {
            console.log(resp);
              console.log(resp.cartId);
              setcartID(resp.cartId)
          setProduct(resp.data.products)
        
          
          setTotal(resp.data.totalCartPrice)
      }
      
     } catch (error) {
      console.log(error);
      
     }finally{
      setIsloading(false)
     }

     
  }
useEffect(() => {

   getLoggedUsercart()
  
}, [])

useEffect(() => {
  const newTotal = product.reduce((acc, p) => acc + Number(p.price) * Number(p.count), 0)
  setTotal(newTotal)
}, [product])


//delte
async function delteOneItem(id:string) {
  // setIsdisable(true)
   setRemovingId(id);
 const resp =  await removeItem(id)
 if(resp.status=="success"){
   setProduct(resp.data.products)
  toast.success("deleted")
  // setIsdisable(false)
  console.log(resp.data.products);
   // عايزه اشي ل اللي اتمسح من الكارت فوق

 let sum = 0 
 resp.data.products.forEach((product:cartProductType) => {
    sum+=product.count
 });
 setNumberOfCarts(sum)
 }

 else{
  toast.error("try to delete it again")
  // setIsdisable(false)
    setRemovingId(null);
 }
}

//update function
async function updateOneItem(id:string,count:string ,sign:string) {

  setIsdisable(true)
  setLoadingcart(true)
  setcurrentid(id)

 const resp =  await updateItem(id ,count)

 if(resp.status=="success"){
   setProduct(resp.data.products)
  toast.success("updated")
  setIsdisable(false)
   setLoadingcart(false)

 } if(sign==="+"){
  setNumberOfCarts(numberOfCarts+1)
 }else if(sign ==="-"){
  setNumberOfCarts(numberOfCarts - 1)
 }
 else{

   toast.error("can't updated")
  setIsdisable(false)
   setLoadingcart(false)

 }
}

//clear all carts

async function deleteAllCarts(){
  
  const resp = await clearAllCarts()
  console.log(resp);

 
  if(resp.message=='success'){
    getLoggedUsercart()
    toast.success("deleted all successfly")
      setIsloading(true)
    setNumberOfCarts(0)
  }else{
    console.log('bla');
     toast.success("cant deleted ")
       setIsloading(false)

  }
  
}

 if(isloading){
  return <div className='h-screen flex justify-center items-center text-3xl text-gray-400 font-semibold italic'>
  <span className="loader"></span>
</div>
 }
  return <>
  

{product?.length>0?  
<div className="my-10 container capitalize">
  <div className='flex justify-between items-center '>
       
      <h1 className='text-2xl text-#[0B4143] font-semibold '>
        total price : {total }
        </h1>
      <Button onClick={()=>deleteAllCarts()} 
       className='bg-main cursor-pointer  my-10 hover:bg-green-900'>
         clear all carts
        </Button>
  </div>
  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
     

   {product.map((product:cartProductType)=> 
  
   <div key={product.product._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col">
    
      <Image
        src={product.product.imageCover}
        alt={product.product.title}
        className="w-full h-40 object-contain mb-4"
         width={100}
         height={100}
      />
      <h3 className="font-semibold text-gray-900 dark:text-white">{product.product.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.price}</p>
      <div className="flex items-center mb-3">
        <button    disabled={isdisable} 
         onClick={()=> updateOneItem(product.product.id,`${product.count - 1}` ,"-")}
         className="h-6 w-6 flex disabled:cursor-progress items-center justify-center 
         border rounded-full cursor-pointer">
          -
          </button>
      <span  className="w-8 text-center mx-2 border rounded flex justify-center items-center">
        {product.product._id == currentid? loadingcart?<RiLoader2Fill className='animate-spin' />:product.count :product.count }
        
       </span>
        <button       disabled={isdisable}  onClick={()=> updateOneItem(product.product.id,`${product.count + 1 }`,"+")}
         className="h-6 w-6 flex items-center justify-center border rounded-full disabled:cursor-progress cursor-pointer">
          +
          </button>
      </div>
 
   <Button
  disabled={removingId === product.product._id}
  onClick={() => delteOneItem(product.product._id)}
  className={`text-white mt-auto text-sm 
    dark:text-red-500 
    bg-red-700 hover:bg-red-800 
    ${
      removingId === product.product._id
        ? "opacity-50 cursor-not-allowed bg-red-300"
        : "cursor-pointer"
    }`}
>
  {removingId === product.product._id ? (
    <RiLoader2Fill className="animate-spin" />
  ) : (
    "Remove"
  )
  
  
  }
</Button>
  </div> )}
    
  </div>
<Link href={`/checkout/${cartID}`}>
<Button 
  className="
    my-10  bg-main  hover:bg-green-700  text-white  font-semibold    rounded-2xl  shadow-md  transition-all 
   duration-300 hover:scale-105
  "
>
  Checkout Now
</Button>
</Link>

</div>: <div className='h-screen flex justify-center items-center text-3xl text-gray-400 font-semibold italic'>
  cart is empty
</div> }



  </>
}
