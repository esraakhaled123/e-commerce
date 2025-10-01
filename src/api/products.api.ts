

export default async function getAllproducts() {

   try {
     const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/products`)
     if(!resp.ok){
         throw new Error("something  wrong")
     }
     const {data} =await resp.json()
     console.log(data);
    return data
   } catch {
    console.log('baaad');
    
   }
}