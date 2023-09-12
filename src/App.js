import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import UploadProducts from './Components/Pages/UploadProducts/uploadProducts';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Pages/Homepage/homepage';
import DefaultRoute from './Components/Pages/DefaultRoute/defaultRoute';
import Login from './Components/Pages/Login/login';
import Topbar from './Components/Pages/Topbar/topbar';
import cookies from './Components/Others/Cookies/cookies';
import Sidedrawer from './Components/Others/Sidedrawer/sidedrawer';
import Backdrop from './Components/Others/Backdrop/backdrop';
import { disableScroll } from './Components/Others/Utility/utility';
import Products from './Components/Pages/Products/products';
import Product from './Components/Pages/Product/product';

function App() {

  const cookie = cookies.get('token');
  const [sidedrawer, setSidedrawer] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  useEffect(() => {
    if (backdrop){
      disableScroll();
    }
    else {
      window.onscroll = { };
    }
  }, [backdrop])

  const toggleSidedrawer = () => {
    setSidedrawer((sidedrawer) => !sidedrawer)
    setBackdrop((backdrop) => !backdrop);
  }
  
  return (
    <div className="App">
        {cookie !== undefined ? <Topbar toggleSidedrawer={toggleSidedrawer}/> : null}
        <Sidedrawer sidedrawer={sidedrawer} />
        <Backdrop backdrop={backdrop} toggleBackdrop={toggleSidedrawer} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/welcome' element={<Homepage /> } />
          <Route path='/upload-products' element={<UploadProducts />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:productsId' element={<Products />} />
          <Route path='/products/:product' element={<Product />} />
          <Route path='*' element={<DefaultRoute />} />
        </Routes>
    </div>
  );
}

export default App;
