import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context/AppContext";
import { Search, X } from "lucide-react";

const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredMenus(filtered);
    }
  }, [searchQuery, menus]);
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  return <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
    <div className="container mx-auto px-4">
      {/* header section */}
      <div>
        <h1 className='text-4xl font-bold mb-3'>Our <span className='text-yellow-500'>Menu</span></h1>
        <p className='text-gray-60 max-w-2xl mx-auto'>Explore our delicious selection of handcrafted dishes made with the
            finest ingredients</p>
            {/* search box */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                <input type="text" placeholder="search for your favourite dish..." value={searchQuery} onChange={(e)=>setSearchQuery(e)=>setSearchQuery(e.target.value)} className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-4 shadow-md" />
                {searchQuery && (
                  <button onClick={handleClearSearch}>
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
      </div>
    </div>
    
  </div>;
};

export default Menu;
