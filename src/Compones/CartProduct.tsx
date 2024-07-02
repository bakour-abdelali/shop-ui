import { textDoc } from "../cour/fuction";
import "../index.css";
import { IProduct } from "../interfaces";
import ImageProduct from "./imageProduct";
import Button from "./ui/Button";

interface IProms{
  product:IProduct
}
const CartProduct = ({product}:IProms) => {
  console.log(product);
  return (
    <div className="border p-5 m-1">
      {/* ImageProduct */}
      <ImageProduct 
        src={product.imageURL} 
        alt={product.title} 
        className="rounded-md mt-2" 
      />
      <h2>{product.title} </h2>
      <p >
      {textDoc(product.description)} 
      </p>
      <div className="flex items-center space-x-2 cursor-pointer my-4">
        <span className="w-5 h-5 rounded-full bg-red-700"></span>
        <span className="w-5 h-5 rounded-full bg-blue-500"></span>
        <span className="w-5 h-5 rounded-full bg-black"></span>
        <span className="w-5 h-5 rounded-full bg-yellow-400"></span>
      </div>
      <div className="flex items-center justify-between ">
        <span>{product.price} $</span>
        <ImageProduct 
          className="rounded-full h-10 w-10" 
          src={product.imageURL} 
          alt={product.title} 
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
       <Button className="bg-indigo-600" onClick={() => {alert("روح تعطي")}}>Edit</Button>
        <Button className="bg-red-600 "  width={"w-fit"}  onClick={()=>{console.log("Edit")}}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CartProduct;
