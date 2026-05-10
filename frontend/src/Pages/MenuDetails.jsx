import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { X } from "lucide-react";

const Cart = () => {
  const { cart, totalPrice, navigate, removeFromCart } = useContext(AppContext);

  if (!cart?.items?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
      </div>
    );
  }

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
            {cart.items.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="font-medium text-gray-800">
                    {item.menuItem.name}
                  </span>
                </td>

                <td className="py-3 px-4 text-center">{item.quantity}</td>

                <td className="py-3 px-4 text-center">
                  ${item.menuItem.price}
                </td>

                <td className="py-3 px-4 text-center font-semibold">
                  ${item.menuItem.price * item.quantity}
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <h3 className="text-xl font-semibold">
          Total:{" "}
          <span className="text-green-600">${totalPrice}</span>
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