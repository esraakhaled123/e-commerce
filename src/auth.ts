
import {jwtDecode} from "jwt-decode";

import { NextAuthOptions } from 'next-auth';

import Credentials from 'next-auth/providers/credentials';



export const AuthOptions:NextAuthOptions={
    pages:{
        signIn:'/login'
    },
providers:[
    Credentials({
        name:'Credentials',
        credentials:{
            email : {},
            password : {}
        },
        // بعد م اعمل لوج ان هتشتغل 
        authorize :async (Credentials) =>{
          const response = await  fetch(`${process.env.API}/auth/signin`,{
            method:'post',
            body:JSON.stringify({
                email:Credentials?.email,
                password:Credentials?.password
            }),
           headers: {
        "Content-Type": "application/json",
      }
          })
          const payload= await response.json()
          console.log(payload);
        
         if(payload.message=='success'){
           // return payload.user
           // return payload.token
           //مينفعش نرجع اكتر من حاجه ف هرجه اوبجكت فيه اليوز والتوكين 
            // لازم الريترن اللي ف حالةاوبجكت يحتوي علي id
            const decodedToken :{id:string} = jwtDecode(payload.token);
            // console.log("mytoken",decoded);
            
           return{
             id: decodedToken.id,         
      name: payload.user.name,     
      email: payload.user.email,
      role: payload.user.role,
      token: payload.token,
           }
          
         }else{
            throw  new Error(payload.message ||'wrong')
           
            
         }
        }
    })
],
// run after login
// callbacks:{
//     //tokin => da el data eli ashfaraha ,hwa 3bara 3n object 
//     //user => da el object eli rag3li mn auth
//      async jwt({ token, user}) {
//     if(user){
//  token.user = user?.user;
// token.token = user?.token;

//     }
//       return token // object{user, token} encrpted only server 
//     },
//      async session({ session, token }) {
//     //session => data accesse 3la elclient y3ny msh a7d feh el token
//     //token => token returned from jwt
//     session.user= token.user
//       return session
//     },
// },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          role: user.role,
        }
        token.token = user.token
      }
      return token
    },

    async session({ session, token }) {
      if (token.user) {
        // هنا TypeScript مش هيعترض لإننا عرّفنا user جوه JWT
        session.user = token.user
      }
      return session
    },
  },
}