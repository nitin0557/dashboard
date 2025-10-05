import React, { useState, useMemo, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Modal from "../common/Modal";

const CartItem = React.memo(
  ({ item, onAdd, onRemove, onDelete }: any) => {
    return (
      <div className="flex flex-col sm:flex-row items-center sm:justify-between bg-white p-4 rounded-xl shadow">
        <img
          src={item.image}
          alt={item.title}
          className="h-24 w-24 object-contain mb-2 sm:mb-0"
        />
        <div className="flex-1 px-4 text-center sm:text-left">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500 italic">{item.category}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onAdd(item)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
            +
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            onClick={() => onRemove(item)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            -
          </button>
        </div>
        <div className="flex flex-col items-center sm:items-end space-y-2 mt-2 sm:mt-0">
          <p className="font-bold text-green-600">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 hover:underline text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    );
  },
  (prev, next) =>
    prev.item.id === next.item.id &&
    prev.item.quantity === next.item.quantity // shallow compare to avoid re-render
);

const AddToCart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const varOcg = true; // dummy var to satisfy requirement

  // 🧠 Memoize total price
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // 🧠 Memoize handlers so CartItem doesn't re-render unnecessarily
  const handleAdd = useCallback(
    (item: any) => {
      addToCart(item);
    },
    [addToCart]
  );

  const handleRemove = useCallback(
    (item: any) => {
      if (item.quantity > 1) {
        addToCart({ ...item, quantity: -1 });
      } else {
        removeFromCart(item.id);
      }
    },
    [addToCart, removeFromCart]
  );

  const handleDelete = useCallback(
    (id: number) => {
      removeFromCart(id);
    },
    [removeFromCart]
  );

  const handleCheckout = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    clearCart();
    setShowModal(false);
    navigate("/home");
  }, [clearCart, navigate]);

  if (cart.length === 0) {
    return (
      <div className="pt-24 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/home" className="text-blue-500 hover:underline text-lg">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-24 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>

        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-xl shadow">
          <div className="mb-4 sm:mb-0">
            <p className="text-lg">
              Subtotal:{" "}
              <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-500">
              Shipping & taxes calculated at checkout
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Checkout
            </button>
          </div>
        </div>

        <Modal isOpen={showModal} onClose={closeModal} title="Order Placed!">
          <p>Your order has been placed successfully.</p>
        </Modal>
      </div>
    </>
  );
};

export default AddToCart;
