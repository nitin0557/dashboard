import React from "react";
import { Products } from "../types/types";
import { Link } from "react-router-dom";

export type ProductsProp = {
  product: Products;
};

export const ProductCard = React.memo(({ product }: ProductsProp) => {

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div
        className="
          bg-white rounded-2xl shadow-md border border-gray-200 
          p-4 flex flex-col 
          hover:shadow-xl hover:scale-105 
          transition-transform transition-shadow duration-300 ease-out
        "
      >

        <div className="w-full h-40 sm:h-48 md:h-56 flex items-center justify-center overflow-hidden mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-full w-full transform hover:scale-110 transition-transform duration-300 ease-in-out"
          />
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
          {product.title}
        </h3>

        <p className="text-lg sm:text-xl font-bold text-green-600 mt-1">
          ₹{product.price}
        </p>

        <p className="text-sm sm:text-base text-gray-600 mt-2 line-clamp-3">
          {product.description}
        </p>

        <p className="text-xs sm:text-sm text-gray-500 mt-2 italic">
          Category: {product.category}
        </p>
      </div>
    </Link>
  );
});
