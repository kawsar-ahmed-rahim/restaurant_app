import {Routes,Route,useLocation} from "react-router-dom";
import React from "react";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import MenuDetails from "./Pages/MenuDetails";
import Checkout from './Pages/Checkout';
import BookTable from './Pages/BookTable';
import MyBookings from './Pages/MyBookings';
import MyOrders from './Pages/MyOrders';
import Signup from './Pages/Signup';
import Cart from './Pages/Cart';
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation();
  const adminPath = location.pathname.includes("admin");
  return <div>
    <Toaster />
          {!adminPath && <Navbar/>}

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/menu" element={<Menu/>}/>
      <Route path="/menu-details/:id" element={<MenuDetails/>}/>
      <Route path="/contact" element={<Contact/>}/>
     
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/book-table" element={<BookTable/>}/>
      <Route path="/my-bookings" element={<MyBookings/>}/>
       <Route path="/my-orders" element={<MyOrders/>}/>
        <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>

    </Routes>
  </div>;
};

export default App;
