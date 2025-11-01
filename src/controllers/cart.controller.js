import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) cart = new Cart({ user: req.user._id, items: [] });

  const itemIndex = cart.items.findIndex((i) => i.product.toString() === productId);
  if (itemIndex >= 0) cart.items[itemIndex].quantity += quantity;
  else cart.items.push({ product: productId, quantity });

  await cart.save();
  res.status(201).json(cart);
};
