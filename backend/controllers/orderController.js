import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
// place order
export const placeOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { address } = req.body;

    if (!address) {
      return res
        .status(400)
        .json({ message: "Address is required", success: false });
    }
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty", success: false });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0,
    );

    const newOrder = await Order.create({
      user: id,
      items: cart.items.map((item) => ({
        menuItem: item.menuItem._id,
        quantity: item.quantity,
      })),
      totalAmount,
      address,
    });
    // clear cart
    cart.items = [];
    await cart.save();
    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to place order", success: false });
  }
};

// get user orders
export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id }).sort({ createdAt: -1 });
    res.status(200).json({ orders, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch orders", success: false });
  }
};

// get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").sort({ createdAt: -1 });
    res.status(200).json({ orders, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch orders", success: false });
  }
};

// update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.find;
    ById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    order.status = status;

    await order.save();
    res.status(200).json({ message: "Order status updated", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to update order status", success: false });
  }
};
