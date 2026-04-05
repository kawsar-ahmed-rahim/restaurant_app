
import Cart from "../models/cartModel.js";
// add to cart
export const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const { id } = req.user;

    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res
        .status(400)
        .json({ message: "Menu item not found", success: false });
    }
    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = await Cart.create({
        user: id,
        items: [],
      });
    }
    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuItemId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuItemId, quantity });
    }
    await cart.save();
    return res
      .status(200)
      .json({ message: "Item added to cart", success: true, cart });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Internal server error", success: false });
  }
};

// get user cart
export const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");
    if (!cart) {
      return res
        .status(200)
        .json({ message: "Cart is empty", items: [], success: true });
    }
    return res
      .status(200)
      .json({ message: "Cart retrieved successfully", success: true, cart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuItemId } = req.body;
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res
        .status(400)
        .json({ message: "Cart not found", success: false });
    }
    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuItemId,
    );

    await cart.save();
    return res
      .status(200)
      .json({ message: "Item removed from cart", success: true, cart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};
