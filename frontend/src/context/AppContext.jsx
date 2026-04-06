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
  useEffect(()=>{
    isAuth();
  },[])
  const value = { navigate, loading, setLoading, user, setUser, axios, admin, setAdmin };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
