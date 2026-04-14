import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const AppContext = createContext();
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

  const fetchCategories=async() => {
    try {
      const {data} =await axios.get("/api/category/all")
      if(data.success) {
        setCategories(data.categories)
      } else {
        console.log("Failed to fetch categories");
        
      }
    } catch (error) {
      console.log("Error fetching categories:",error);
      
    }
  }
  const fetchMenus=async() => {
    try {
      const {data} =await axios.get("/api/menu/all")
      if(data.success) {
        setMenus(data.menuItems)
      } else {
        console.log("Failed to fetch categories");
        
      }
    } catch (error) {
      console.log("Error fetching categories:",error);
      
    }
  }
  const isAuth=async()=>{
    try {
      const {data}=await axios.get("/api/auth/is-auth");
      if(data.success){
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    isAuth();
    fetchCategories();
    fetchMenus();
  },[]);
  const value = { navigate, loading, setLoading, user, setUser, axios, admin, setAdmin, categories, fetchCategories, menus, fetchMenus };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
