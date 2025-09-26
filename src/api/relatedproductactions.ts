

'use server'


export default async function  getRelatedProducts(catId:string){
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`)
    const data = await resp.json()
    console.log(data);
    return data

}