'use server'
export default async function resetPass(email:string , newpass:string) {
     const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
        method:'post',
          headers: {
        "Content-Type": "application/json",
      },
        body:JSON.stringify({email:email ,
            newPassword:newpass
        })
     })
     
     const data = await resp.json()
     console.log(data);
     return data
   
}