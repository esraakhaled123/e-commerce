

export default async function addBrand(){
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
     const {data} = await resp.json()
     return data
}