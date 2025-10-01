

export default async function singleBrand(id:string){
      const resp= await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
       const {data} = await resp.json()
       return data
}