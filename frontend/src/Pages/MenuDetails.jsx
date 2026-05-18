import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { toast } from "react-hot-toast";

const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate, addToCart } = useContext(AppContext);
  const [menu, setMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundMenu = menus.find((item) => item._id === id);
    if (foundMenu) {
      setMenu(foundMenu);
    }
    setLoading(false);
  }, [id, menus]);

  const handleAddToCart = () => {
    if (!menu?._id) {
      toast.error("Unable to add item to cart");
      return;
    }
    if (!menu?.isAvailable) {
      toast.error("This item is not available");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(menu._id);
    }
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-2xl font-semibold text-gray-700 mb-4">
          Menu item not found
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/menu")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft size={20} />
          Back to Menu
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src={menu?.image || "https://via.placeholder.com/400"}
                  alt={menu?.name || "Menu item"}
                  className="w-full h-96 object-cover rounded-xl"
                />
                {!menu.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      Unavailable
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {menu?.name || "N/A"}
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  {menu?.description || "No description available"}
                </p>

                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${menu?.price || "0"}
                  </span>
                  <span className="text-sm text-gray-500">Per item</span>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    Category
                  </p>
                  <p className="text-lg text-gray-800">
                    {menu?.category || "N/A"}
                  </p>
                </div>

                {/* Availability */}
                <div className="mb-8">
                  <p
                    className={`text-lg font-semibold ${
                      menu?.isAvailable ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {menu?.isAvailable ? "✓ In Stock" : "✗ Out of Stock"}
                  </p>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <label className="text-lg font-semibold">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!menu?.isAvailable}
                  className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    menu?.isAvailable
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white hover:shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>

                <button
                  onClick={() => navigate("/menu")}
                  className="w-full py-3 rounded-lg font-semibold text-gray-800 border border-gray-300 hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
