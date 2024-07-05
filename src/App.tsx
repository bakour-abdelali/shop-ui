
import './index.css';

import { productList } from './data';
import CartProduct from './Compones/CartProduct';

import { useState } from 'react';
import { MyModal } from './Compones/ui/modle';
import Button from './Compones/ui/Button';


function App() {
  // state 
  const [isOpen, setIsOpen] = useState(true)





// function
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
  // data

  const models = productList.map(e => <CartProduct key={e.id} product={e} />);
 
  return (
    <main className='container '>  
      <div className='p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4  rounded-md m-5'>
    {models}
  </div>
  <div><MyModal isOpen={isOpen}  closeModal={()=>closeModal() }  title={"Add product"}>
    <Button className="bg-indigo-600" onClick={() => {closeModal()}} >Done</Button>
    <Button className="bg-indigo-600" onClick={() => {closeModal()}} >close</Button>
    </MyModal></div>
  
  </main>
  
  );
}

export default App;
