import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const AppContext = createContext();
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
import {toast} from "react-hot-toast";
import { addToCart } from './../../../backend/controllers/cartController';

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartData=async()=>{
    try {
      const {data} = await axios.get("/api/cart/get");
      if(data.success){
        setCart(data.cart);
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
   if(cart?.item){
    const total = cart.items.reduce((sum,item)=>sum+item.menuItem.price*item.quantity,0);
    setTotalPrice(total);

   }
  },[cart]);
  const  cartCount = cart?.items?.reduce(
    (acc,item)=> acc + item.quantity,0 || 0
  )
  // add to cart function
  const addToCart=async(menuId)=>{
    try {
      const {data} = await axios.post("/api/cart/add",{menuId,quantity:1});
      if(data.success){
        toast.success(data.message);
        
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.error("Add to cart error:",error);
      toast.error("something went wrong");
      
    }
  }


  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) {
        setCategories(data.categories);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };
  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success) {
        setMenus(data.menuItems);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };
  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isAuth();
    fetchCategories();
    fetchMenus();
  }, []);

  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    admin,
    setAdmin,
    axios,
    categories,
    setCategories,
    fetchCategories,
    menus,
    fetchMenus,
    addToCart,
    fetchCartData,
    cartCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
