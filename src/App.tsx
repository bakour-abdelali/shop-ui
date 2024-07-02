
import './index.css';

import { productList } from './data';
import CartProduct from './Compones/CartProduct';

const log = (message: string, data?: any) => {
  console.log("*********************************************************************************************");
  console.log(message, data);
  console.log("*********************************************************************************************");
};

function App() {
  log("Test message", "This is a test");

  const models = productList.map(e => <CartProduct key={e.id} product={e} />);
 
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 '>
      {models}
    </div>
  );
}

export default App;
