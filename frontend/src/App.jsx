import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home";
import Menu from "./Pages/Menus";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import MenuDetails from "./Pages/MenuDetails";
import Checkout from "./Pages/Checkout";
import BookTable from "./Pages/BookTable";
import MyBookings from "./Pages/MyBookings";
import MyOrders from "./Pages/MyOrders";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminLayout from "./Pages/admin/AdminLayout";
import Dashboard from "./Pages/admin/Dashboard";
import AddCategory from "./Pages/admin/AddCategory";
import AddMenu from "./Pages/admin/AddMenu";
import Categories from "./Pages/admin/Categories";
import Orders from "./Pages/admin/Orders";
import Bookings from "./Pages/admin/Bookings";
const App = () => {
  const location = useLocation();
  const adminPath = location.pathname.includes("admin");
  const { admin } = useContext(AppContext);
  return (
    <div>
      <Toaster />
      {!adminPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-details/:id" element={<MenuDetails />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* admin routes */}
        <Route path="/admin" element={admin ? <AdminLayout /> : <AdminLogin />}>
          <Route index element={admin ? <Dashboard /> : <AdminLogin />} />
          <Route
            path="add-category"
            element={admin ? <AddCategory /> : <AdminLogin />}
          />
          <Route
            path="add-menu"
            element={admin ? <AddMenu /> : <AdminLogin />}
          />
          <Route
            path="categories"
            element={admin ? <Categories /> : <AdminLogin />}
          />
          <Route path="menus" element={admin ? <Menu /> : <AdminLogin />} />
          <Route path="orders" element={admin ? <Orders /> : <AdminLogin />} />
          <Route
            path="bookings"
            element={admin ? <Bookings /> : <AdminLogin />}
          />
        </Route>
      </Routes>
      {!adminPath && <Footer />}
    </div>
  );
};

export default App;
