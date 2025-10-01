"use server"
import getmytoken from "@/utilities/getmytoken";

 //even if i call it in client it will be still processed in server

// import getmytoken from "@/utilities/getmytoken"


// export default async function AddToCart(id:string){
//    const token = await getmytoken()
//    if(!token){
//     throw new Error("login to be able to add carts")
//    }
//  const resp = await   fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
//         method:'post',
//        headers:{
//         token,
//         "Content-Type":"application/json"

//        },
//        body:JSON.stringify({productId:id})
//     })
//     const bla = await resp.json()
   
//     return bla
    
// }
export default async function AddToCart(id: string) {
  try {
    const token = await getmytoken();

    if (!token) {
      return { success: false, message: "Login to be able to add carts" };
    }

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: 'post',
      headers: {
        token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productId: id })
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { success: false, message: data.message || "Something went wrong" };
    }

    return { success: true, data };

  } catch{
    return { success: false, message: "Unexpected error, try again later" };
  }
}
