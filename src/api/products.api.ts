export default async function getAllproducts() {

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/products`)
    const {data} =await resp.json()
    // console.log(data);
   return data
}