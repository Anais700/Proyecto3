import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import Category from './components/Category/Category';
import CreateProduct from './components/Product/CreateProduct';
import CreateCategory from './components/Category/CreateCategory';
import CreateSubcategory from './components/Subcategory/CreateSubcategory';
import Product from './components/Product/Product';
import Subcategory from './components/Subcategory/Subcategory';
import ModifyProduct from './components/Product/ModifyProduct';
import ModifyCategory from './components/Category/ModifyCategory';
import ModifySubcategory from './components/Subcategory/ModifySubcategory';
import Logout from './components/Logout/Logout';
import Profile from './components/User/Profile';
import ModifyProfile from './components/User/ModifyProfile';
import Users from './components/User/Users';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/newProduct' element={<CreateProduct/>}/>
          <Route path='/newCategory' element={<CreateCategory/>}/>
          <Route path='/newSubcategory/:categoryId' element={<CreateSubcategory/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/category/:categoryId' element={<Category/>}/>
          <Route path='/subcategory/:subcategoryId' element={<Subcategory/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/product/:productId' element={<Product/>}/>    
          <Route path='/modifyProduct/:productId' element={<ModifyProduct/>}/>
          <Route path='/modifyCategory/:categoryId' element={<ModifyCategory/>}/>
          <Route path='/modifySubcategory/:subcategoryId' element={<ModifySubcategory/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/modifyProfile' element={<ModifyProfile/>}/>
          <Route path='/users' element={<Users/>}/>

        </Routes>
      </BrowserRouter>
      <Footer/>      
    </div>
  );
}
 
export default App;
