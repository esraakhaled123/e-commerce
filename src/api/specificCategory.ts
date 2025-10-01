
export default async function  categoryDetails(id:string) {
     const resp= await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
       const {data} = await resp.json()
       return data
    
}