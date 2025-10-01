

export default async function resetCode(resetCode:string) {
     const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
        method:'post',
          headers: {
        "Content-Type": "application/json",
      },
        body:JSON.stringify({resetCode:resetCode})
     })
     
     const data = await resp.json()
     console.log(data);
     return data
   
}