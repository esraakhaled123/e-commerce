
// import Mainslider from "./_components/Navbar/Mainslider/Mainslider";
// import Categoryslider from "./_components/categorySlider/Categoryslider";
// import Allproducts from "./_components/Allproducts/Allproducts";
// export default function Home() {
// return<>

// <Mainslider/>
// <Categoryslider/>
// <Allproducts/>
// </>
// }
import Mainslider from "./_components/Navbar/Mainslider/Mainslider";
import Categoryslider from "./_components/categorySlider/Categoryslider";
import Allproducts from "./_components/Allproducts/Allproducts";
import getAllproducts from "@/api/products.api";

export default async function Home() {
  const data = await getAllproducts();

  return <>
    <Mainslider/>
    <Categoryslider/>
    <Allproducts products={data}/>
  </>
}
