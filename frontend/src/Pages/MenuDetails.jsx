import { useParams } from "react-router-dom";
import { AppContext } from "./../context/AppContext";
import { useState, useContext } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const menu = menus.find((item) => item._id === id);

  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Menu not found
          </h2>
          <p className="text-gray-600 mb-6">
            The item you are looking for doesn't exist
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition-colors"
          >
            Back to menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* back button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate("/menu")}
          className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-colors" />
          <span className="font-semibold">Back to menu</span>
        </button>
      </div>
      {/* main content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* image section */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={menu.image}
                  alt="image"
                  className="w-full h-[400px] object-cover"
                />

                {/* availability badge */}
                <div className="absolute top-6 right-6">
                  {menu.isAvailable ? (
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span>Available</span>
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg">
                      <XCircle className="w-5 h-5" />
                      <span>Unavailable</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* details section */}
          <div className="space-y-6">
            {/* title and price */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {menu.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-yellow-500">
                  ${menu.price}
                </span>
                <span className="text-gray-500 text-lg">Per item</span>
              </div>
            </div>

            {/* description */}

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {menu.description}
              </p>
            </div>
            {/* total and add to cart */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white text-lg font-semibold">
                  Total Amount
                </span>
                <span className="text-white text-3xl font-bold">
                  ${totalPrice}
                </span>
              </div>
              <button disabled={!menu.isAvailable} onClick={""} className={`cursor-pointer w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                menu.isAvailable ? "ng-white text-yellow-600 hover:bg-gray-50 hover:scale-105 active:scale-95 shadow-lg":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                <ShoppingCart className="w-6 h-6" />
                {menu.isAvailable? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
