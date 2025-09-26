

export default async function ProductDetailsId(id:string) {

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const {data} =await resp.json()
    console.log(data);
   return data
}