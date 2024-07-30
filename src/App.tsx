
import './index.css';

import { formInputsList, productList } from './data';
import CartProduct from './Compones/CartProduct';

import { ChangeEvent, FormEvent, useState } from 'react';
import { MyModal } from './Compones/ui/modle';
import Button from './Compones/ui/Button';
import { Input } from '@headlessui/react';
import { IProduct } from './interfaces';
import { validationProduct } from './validation';
import ErrorHandling from './Compones/ui/ErrorHandling';


function App() {
  const defaultProduct=  {
    title:"",
    description:"",
    imageURL:"",
    price:"",
   
    colors:[],
    category:{
      imageURL:"",
      name:"",
    }
  };
  const defaultError={  title:"",
    description:"",
    imageURL:"",
    price:""}
  // state 
  const [isOpen, setIsOpen] = useState(true)
  const [errors,setErrors]=useState<{  title:string,description:string,imageURL:string,price:string,}>(
    defaultError)
  const [prduct, setProduct] = useState<IProduct>(defaultProduct)
  const onClose=()=>{
    setProduct(defaultProduct);
    // setIsOpen(false);

  }


  const onChangeHandlinf=(e:ChangeEvent<HTMLInputElement> )=>{
   
    const  {name,value}=e.target;
    setProduct({...prduct,[name]:value});
    setErrors({...errors,[name]:""});
  
  
   
  };


// function
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const onSubmit=(s:FormEvent<HTMLFormElement> ):void=>{
    s.preventDefault();
    const error=validationProduct(
      {title:prduct.title,description:prduct.description,imageURL:prduct.imageURL,price:prduct.price}
    );
    
    
    const hasError:boolean=Object.values(error).every((e)=>e=='');
    console.log(error);
    console.log(hasError);

    if(!hasError){
      setErrors(error);
      return;
    }else{
      setErrors(defaultError);
      console.log("sand data in api");
    }

  };
  
  // data

  const models = productList.map(e => <CartProduct key={e.id} product={e} />);
  const from:JSX.Element[] = formInputsList.map(e=><div className='flex flex-col ' >
    <label htmlFor={e.label} className="mb-1">{e.name}</label>
     <Input   
            className=" border-[1px] border-gray-300 shadow-md
              focus:border-indigo-500
                focus:outline-none
                focus:ring-1
              focus:ring-indigo-500
                rounded-md px-3 py-3 text-md"   
                type={e.type} 
                id={e.id} 
                name={e.name}
                value={prduct[e.name]}
                 onChange={onChangeHandlinf}  />
                 <ErrorHandling msg={errors[e.name]} />
  </div>)

  return (
    <main className='container '>  
      <div className='p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4  rounded-md m-5'>
    {models}
  </div>
  
    <MyModal isOpen={isOpen}  closeModal={()=>closeModal() }  title={"Add product"}>
      <form className='space-y-2' onSubmit={onSubmit}>
      {from}
        
    <div className='flex items-center space-x-2'>
      <Button className="bg-indigo-600" type='submit' >Submit</Button>
    <Button className="bg-gray-400" onClick={onClose}>close</Button>
    </div>

      </form>
  
    
    </MyModal>
  
  </main>
  
  );
}

export default App;
