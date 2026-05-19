import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const [authLoading, setAuthLoading] = useState(true);
  // fetch cart
  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");

      if (data.success) {
        setCart(data.cart || { items: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // total price
  useEffect(() => {
    const total = (cart?.items || []).reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0,
    );

    setTotalPrice(total);
  }, [cart]);

  // cart count
  const cartCount = (cart?.items || []).reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  // add to cart
  const addToCart = async (menuId, quantity = 1) => {
    try {
      const { data } = await axios.post("/api/cart/add", {
        menuId,
        quantity,
      });

      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // remove from cart
  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${menuId}`);

      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // menus
  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");

      if (data.success) {
        setMenus(data.menuItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // auth
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
  // admin auth
  const adminAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/admin-auth", {
        withCredentials: true,
      });

      if (data.success) {
        setAdmin(data.user);
        localStorage.setItem("admin", JSON.stringify(data.user));
      } else {
        setAdmin(null);
        localStorage.removeItem("admin");
      }
    } catch (error) {
      setAdmin(null);
      localStorage.removeItem("admin");
    } finally {
      setAuthLoading(false); // IMPORTANT
    }
  };

  // Initialize admin from localStorage
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.log("Error parsing admin from localStorage:", error);
        localStorage.removeItem("admin");
      }
    }
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        setAdmin(null);
        localStorage.removeItem("admin");
        return true;
      }
      return false;
    } catch (error) {
      console.log("Logout error:", error);
      // Even if logout API fails, clear local state
      setUser(null);
      setAdmin(null);
      localStorage.removeItem("admin");
      return false;
    }
  };

  useEffect(() => {
    isAuth();
    adminAuth();
    fetchCategories();
    fetchMenus();
    fetchCartData();
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
    menus,
    setMenus,
    cart,
    setCart,
    totalPrice,
    cartCount,
    addToCart,
    removeFromCart,
    fetchCartData,
    fetchCategories,
    fetchMenus,
    logout,
    authLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
