import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // import cart hook
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../store/productSlice";
import Header from "./Header";

 const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const { addToCart } = useCart(); // get addToCart function
  const { items, status } = useSelector((state: RootState) => state.products)


  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, items.length])

  const product = items.find(p => p.id === Number(id))

   if (status === 'loading') return <p>Loading…</p>


  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <>
     <Header />
    <div className="pt-24 max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/home"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-80 w-full"
          />
        </div>

    
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-green-600 font-bold text-xl mb-4">₹{product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500 italic">
              Category: {product.category}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;
