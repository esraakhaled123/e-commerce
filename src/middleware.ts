
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request:NextRequest){
// req da el url eli bb3to 

   const token = await getToken({req:request})
   console.log(request); // contain cookies , url feh pathname
  
   
   if(token){
    // مش عايزاه يروح علي اللوجن او ..  لو هوه معاه توكن 
     if(request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'){
  return NextResponse.redirect(new URL("/",request.url))
   }else{
    return NextResponse.next()//go  place you wanted to 
   }
   }

   // if i don't have token
   else{

    if (request.nextUrl.pathname === '/cart' || request.nextUrl.pathname === '/brands' || request.nextUrl.pathname === '/checkout' || request.nextUrl.pathname === '/wishlist') {
  return NextResponse.redirect(new URL("/login", request.url))

    }else{
    return NextResponse.next()//go  place you wanted to 
    }
   
   }
}
export const config = {
  //ده معناه لو لقتني كتبت كارت او براند او لوجن او ريج عدي علي الميدويير غير كده متعديش عليه 
  matcher: ['/cart' ,'/brands' ,'/login' ,'/register','/checkout' ,'/wishlist'],
}