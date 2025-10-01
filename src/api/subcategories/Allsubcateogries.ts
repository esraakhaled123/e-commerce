
export default async function  getAllSubCategories() {
     const resp= await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories`)
       const {data} = await resp.json()
       return data
    
}