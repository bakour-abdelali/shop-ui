import './index.css';
import { categories, colors, formInputsList, productList } from './data';
import CartProduct from './Compones/CartProduct';
import { ChangeEvent, FormEvent, useState } from 'react';
import { MyModal } from './Compones/ui/modle';
import Button from './Compones/ui/Button';
import { Input } from '@headlessui/react';
import { ICategory, IProduct } from './interfaces';
import { validationProduct } from './validation';
import ErrorHandling from './Compones/ui/ErrorHandling';
import CirclerColor from './Compones/ui/CirclerColor';
import { v4 as uuid } from "uuid";
import Select from './Compones/ui/Select';
import { ProductNameTypes } from './types';
import { toast, Toaster } from 'react-hot-toast'; // تأكد من استيراد Toaster من react-hot-toast

function App() {
  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      imageURL: "",
      name: "",
    }
  };
  
  const defaultError = {
    title: "",
    description: "",
    imageURL: "",
    price: ""
  };
  
  // state 
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenEdite, setIsOpenEdite] = useState(false);
  const [errors, setErrors] = useState<{ title: string, description: string, imageURL: string, price: string }>(
    defaultError);
  const [prducts, setProducts] = useState<IProduct[]>(productList);
  const [prduct, setProduct] = useState<IProduct>(defaultProduct);
  const [catagore, setCatagore] = useState<ICategory>(categories[0]);
  const [productEdite, setProductEdite] = useState<IProduct>(defaultProduct);
  const [productIndexSelected, setIndex] = useState<number>(0);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [temp, setTemp] = useState<string[]>([]);
  
  console.log(temp);
  
  const onClose = () => {
    setProduct(defaultProduct);
  };
  
  const removeProductHandler = () => {
    const updatedProducts = [...prducts];
    updatedProducts.splice(productIndexSelected, 1);
  
    setProducts(updatedProducts);
    closeConfirmModal();
    toast.success("Product has been deleted successfully!", {
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };
  
  const onChangeHandlinf = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...prduct, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  
  const onChangeHandlnEdite = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductEdite({ ...productEdite, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  
  function closeModal() {
    setIsOpen(false);
  }
  
  function openModal() {
    setIsOpen(true);
  }
  
  function closeModalEdite() {
    setIsOpenEdite(false);
  }
  
  function openModalEdite(productToEdite: IProduct, index: number) {
    setIndex(index);
    setProductEdite(productToEdite);
    setIsOpenEdite(true);
  }
  
  const onSubmit = (s: FormEvent<HTMLFormElement>): void => {
    s.preventDefault();
    const error = validationProduct(
      { title: prduct.title, description: prduct.description, imageURL: prduct.imageURL, price: prduct.price }
    );
    
    const hasError: boolean = Object.values(error).every((e) => e == '');
    if (!hasError) {
      setErrors(error);
      return;
    } else {
      setErrors(defaultError);
      setProducts(prev => [{ ...prduct, colors: temp, id: uuid(), category: catagore }, ...prev]);
      setProduct(defaultProduct);
      setTemp([]);
      closeModal();
    }
  };
  
  const onSubmitEdite = (s: FormEvent<HTMLFormElement>): void => {
    s.preventDefault();
    const error = validationProduct(
      { title: productEdite.title, description: productEdite.description, imageURL: productEdite.imageURL, price: productEdite.price }
    );
    
    const hasError: boolean = Object.values(error).every((e) => e == '');
    if (!hasError) {
      setErrors(error);
      return;
    } else {
      setErrors(defaultError);
      
      const updateProduct: IProduct[] = [...prducts];
      updateProduct[productIndexSelected] = productEdite;
      setProducts(updateProduct);
      
      setTemp([]);
      closeModalEdite();
    }
  };
  
  const randerProductToEdit = (id: string, label: string, name: ProductNameTypes) => {
    return (
      <div className='flex flex-col'>
        <label htmlFor={name} className="mb-1">{label}</label>
        <Input
          className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-3 text-md"
          type={"text"}
          id={id}
          name={name}
          value={productEdite[name]}
          onChange={onChangeHandlnEdite} />
        <ErrorHandling msg={errors[name]} />
      </div>
    );
  };
  
  const models = prducts.map(
    (e, index) => <CartProduct key={e.id} product={e} editeProduct={() => openModalEdite(e, index)} deleteProduct={() => { setIsOpenConfirmModal(true); setIndex(index); }} />
  );
  
  const colorsProduct = colors.map(color => <CirclerColor key={color} color={color} onClick={() => {
    if (temp.includes(color)) {
      setTemp(element => element.filter(t => t != color));
      return;
    }
    setTemp(element => [...element, color]);
  }} />);
  
  const colorsProductEdite = colors.map(color => (
    <CirclerColor
      key={color}
      color={color}
      onClick={() => {
        const updatedColors = productEdite.colors.includes(color)
          ? productEdite.colors.filter(t => t !== color)
          : [...productEdite.colors, color];
        
        setProductEdite({
          ...productEdite,
          colors: updatedColors,
        });
      }}
    />
  ));
  
  const from: JSX.Element[] = formInputsList.map(e =>
    <div className='flex flex-col'>
      <label htmlFor={e.label} className="mb-1">{e.name}</label>
      <Input
        className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-3 text-md"
        type={e.type}
        id={e.id}
        name={e.name}
        value={prduct[e.name]}
        onChange={onChangeHandlinf} />
      <ErrorHandling msg={errors[e.name]} />
    </div>
  );

  return (
    <main className='container'>
      <div className='p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4  rounded-md m-5'>
        {models}
      </div>
      {/* Add Modal */}
      <MyModal isOpen={isOpen} closeModal={() => closeModal()} title={"Add product"}>
        <form className='space-y-2' onSubmit={onSubmit}>
          {from}
          <div className='flex items-center space-x-2'>
            {colorsProduct}
          </div>
          <Select selected={catagore} setSelected={setCatagore} />
          <div className='flex items-center flex-wrap space-x-2 space-y-2'>
            {temp.map(t => <span className="block rounded-md text-white p-2" style={{ backgroundColor: t }}>{t}</span>)}
          </div>
          <div className='flex items-center space-x-2'>
            <Button className="bg-indigo-600" type='submit'>Submit</Button>
            <Button className="bg-gray-400" onClick={closeModal}>close</Button>
          </div>
        </form>
      </MyModal>
      {/* Edit Modal */}
      <MyModal isOpen={isOpenEdite} closeModal={() => closeModalEdite()} title={"Edit product"}>
        <form className='space-y-2' onSubmit={onSubmitEdite}>
          {randerProductToEdit("title", "product title", 'title')}
          {randerProductToEdit("description", "product description", 'description')}
          {randerProductToEdit("imageURL", "product imageURL", 'imageURL')}
          {randerProductToEdit("price", "product price", 'price')}
          <Select selected={productEdite.category} setSelected={(value) => {
            setProductEdite({ ...productEdite, category: value })
          }} />
          <div className='flex items-center space-x-2'>
            {colorsProductEdite}
          </div>
          <div className='flex items-center flex-wrap space-x-2 space-y-2'>
            {productEdite.colors.map((t) =>
              <span className="block rounded-md text-white p-2" style={{ backgroundColor: t }}>{t}</span>)}
          </div>
          <div className='flex items-center space-x-2'>
            <Button className="bg-indigo-600" type='submit'>Submit</Button>
            <Button className="bg-gray-400" onClick={closeModalEdite}>close</Button>
          </div>
        </form>
      </MyModal>
      {/* Delete Modal */}
      <MyModal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </MyModal>

      <Toaster /> {/* مكون التنبيهات لعرض الرسائل */}
    </main>
  );
}

export default App;
