import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";
import { addToCart } from './../../../backend/controllers/cartController';
const MenuCard = ({ menu }) => {
  const { navigate, addToCart } = useContext(AppContext);
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      {/* image section */}
      <div
        onClick={() => navigate(`/menu-details/${menu._id}`)}
        className="relative h-58 overflow-hidden cursor-pointer"
      >
        <img
          src={menu.image}
          alt="img"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {!menu.isAvailable && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Unavailable
            </div>
          )}
        </div>
      </div>
      {/* content section */}
      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1">
          {menu.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {menu.description}
        </p>

        {/* price and add to cart */}
        <div className="flex items-center justify-center mt-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">${menu.price}</p>
          </div>
          <button onClick={()=>addToCart(menu._id)} disabled={!menu.isAvailable} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${menu.isAvailable?"bg-yellow-500 hover:bg-yellow-600 text-white hover:scale-90 hover:shadow-lg active:scale-95":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
            <ShoppingCart className="w-4 h-4"/><span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
