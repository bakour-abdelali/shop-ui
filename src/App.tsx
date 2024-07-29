
import './index.css';

import { formInputsList, productList } from './data';
import CartProduct from './Compones/CartProduct';

import { ChangeEvent, useState } from 'react';
import { MyModal } from './Compones/ui/modle';
import Button from './Compones/ui/Button';
import { Input } from '@headlessui/react';
import { IProduct } from './interfaces';


function App() {
  // state 
  const [isOpen, setIsOpen] = useState(true)
  const [prduct, setProduct] = useState<IProduct>(
  {
    title:"",
    description:"",
    price:"",
    imageURL:"",
    colors:[],
    category:{
      imageURL:"",
      name:"",
    }
  }
  )


  const onChangeHandlinf=(e:ChangeEvent<HTMLInputElement> )=>{
    console.log(e.target.name);
    console.log(e.target.value);
    const  {name,value}=e.target;
    setProduct({...prduct,[name]:value});
  };


// function
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
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
                rounded-md px-3 py-3 text-md"   type={e.type} id={e.id}  value={prduct[e.name]} onChange={onChangeHandlinf}  />
  </div>)

  return (
    <main className='container '>  
      <div className='p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4  rounded-md m-5'>
    {models}
  </div>
  
    <MyModal isOpen={isOpen}  closeModal={()=>closeModal() }  title={"Add product"}>
      <div className='space-y-2'>
      {from}
        
    <div className='flex items-center space-x-2'>
      <Button className="bg-indigo-600" onClick={() => {closeModal()}} >Done</Button>
    <Button className="bg-gray-400" onClick={() => {closeModal()}} >close</Button>
    </div>

      </div>
  
    
    </MyModal>
  
  </main>
  
  );
}

export default App;
