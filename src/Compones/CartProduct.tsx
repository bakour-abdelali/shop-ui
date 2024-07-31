import { textDoc } from "../cour/fuction";
import "../index.css";
import { IProduct } from "../interfaces";
import ImageProduct from "./imageProduct";
import Button from "./ui/Button";

interface IProms{
  product:IProduct
}
const CartProduct = ({product}:IProms) => {
  
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      {/* max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3 */}
      {/* ImageProduct */}
      <ImageProduct 
        src={product.imageURL} 
        alt={product.title} 
        className="rounded-md mt-2 w-full  h-full lg:object-cover" 
        // className="rounded-md mt-2 w-full object-cover"

      />
      <h2 className="text-lg font-semibold ">{textDoc(product.title,20)} </h2>
     
      <div className="h-70" > <p className="text-sm text-gray-500 break-words line-clamp-4" >
      {product.description} 
      </p></div>
      <div className="flex items-center flex-wrap space-x-1">
        {product.colors.map(e=><span className="w-5 h-5 rounded-full " style={{background:e}}></span>)}
        
     
      </div>
      <div className="flex items-center justify-between ">
        <span className="text-lg text-indigo-600 font-semibold">{product.price} $</span>
        <ImageProduct 
          className="rounded-full h-10 w-10" 
          src={product.category.imageURL} 
          alt={product.title} 
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
       <Button className="bg-indigo-600" onClick={() => {alert("روح تعطي")}}>Edit</Button>
        <Button className="bg-red-600 "    onClick={()=>{console.log("Edit")}}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CartProduct;
