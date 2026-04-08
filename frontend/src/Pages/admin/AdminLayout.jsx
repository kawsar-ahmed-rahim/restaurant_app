import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Grid3x3,
  LayoutDashboard,
  Plus,
  Package,
  ShoppingCart,
  BookIcon,
  X,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminLayout = () => {
  const { setAdmin, axios } = useContext(AppContext);
  const location=useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const menuItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      path: "/admin/add-category ",
      name: "Add Category",
      icon: Plus,
    },
    {
      path: "/admin/add-menu ",
      name: "Add Menu",
      icon: Package,
    },
    {
      path: "/admin/categories ",
      name: "Categories",
      icon: Grid3x3,
    },
    {
      path: "/admin/menus ",
      name: " All Menus",
      icon: Grid3x3,
    },
    {
      path: "/admin/orders ",
      name: "Orders",
      icon: ShoppingCart,
    },
    {
      path: "/admin/bookings ",
      name: "Bookings",
      icon: BookIcon,
    }
  ];
  const isActive=(path,exact=false)=>{
    if(exact){
      return location.pathname === path;
  }
  return location.pathname === path;
}

const logout=async()=>{
  try {
    const {data}=await axios.post("/api/auth/logout");
    if(data.success){
      toast.success(data.message);
      setAdmin(null);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error("Something went wrong!");
    
  }
}



  return (
  <div className="flex h-screen bg-gray-100">
    {/* mobile menu button */}
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <button onClick={()=> setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md bg-white shadow-lg hover:bg-gray-50 transition-colors">
      {sidebarOpen?<X size={24}/>:<Menu/>}
      </button>
      </div>
    {/* sidebar */}
    <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex flex-col h-full">
        {/* header logo */}
        <div className="flex items-center justify-center h-16 px-4 bg-secondary text-white">
          <h1 className="text-xl font-bold">Admin panel</h1>
        </div>
        {/* navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item)=>{
            const Icon=item.icon;
            const active=isActive(item.path,item.exact);

            return (
              <Link key={item.path} to={item.path} onClick={()=>setSidebarOpen(false)} className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${active ? "bg-blue-100 text-primary border-r-4 border-primary" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                <Icon className="mr-3" size={20}/>
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
            <div>
              <div className="font-medium text-gray-900">Admin User</div>
              <div>admin@example.com</div>
            </div>
          </div>
        </div>

        {/* mobile overlay */}

        {sidebarOpen && <div onClick={()=> setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"></div>}

        {/* main content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">

          {/* top bar */}
          <header className="bg-whi shadow-sm border-b border-gray-200 lg:pl-0 pl-16">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-2xl font-semibold text-gray-800">
{menuItems.find((item)=>isActive(item.path,item.exact))?. item.name || "Admin panel"}
              </h2>
              <div></div>
            </div>
          </header>
        </div>
    </div>
  </div>
  </div>


  );
}

export default AdminLayout;
