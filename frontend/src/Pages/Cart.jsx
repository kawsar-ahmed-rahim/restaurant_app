import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
const Cart = () => {
  const { cart, totalPrice, navigate, axios, fetchCartData } =
    useContext(AppContext);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
      </div>
    );
  }
  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${menuId}`);
      if (data.success) {
        toast.success(data.message);
        fetchCartData();
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Cart</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Item</th>
              <th className="py-3 px-4 text-left">Qty</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {cart?.items?.map((item) => (
              <tr key={item?._id} className="border-t hover:bg-gray-50">
                <td
                  className="py-3 px-4 flex items-center space-x-3 cursor-pointer"
                  onClick={() =>
                    item?.menuItem?._id &&
                    navigate(`/menu-details/${item?.menuItem?._id}`)
                  }
                >
                  <img
                    src={
                      item?.menuItem?.image || "https://via.placeholder.com/100"
                    }
                    alt={item?.menuItem?.name || "Menu item"}
                    className="w-12 h-12 object-cover rounded hover:scale-110 transition-transform"
                  />
                  <span className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                    {item?.menuItem?.name || "N/A"}
                  </span>
                </td>

                <td className="py-3 px-4 text-center">
                  {item?.quantity || "0"}
                </td>

                <td className="py-3 px-4 text-center">
                  ${item?.menuItem?.price || "0"}
                </td>

                <td className="py-3 px-4 text-center font-semibold">
                  ${(item?.menuItem?.price || 0) * (item?.quantity || 0)}
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => removeFromCart(item?.menuItem?._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <h3 className="text-xl font-semibold">
          Total: <span className="text-green-600">${totalPrice}</span>
        </h3>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
