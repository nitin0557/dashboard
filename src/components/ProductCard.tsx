import React from "react";
import { Products } from "../types/types";
import { Link } from "react-router-dom";
import { useView } from "../context/ViewContext";
import { motion } from "framer-motion";

export type ProductsProp = {
  product: Products;
  onEdit?: () => void;
  onDelete?: (id: number) => void;
};

export const ProductCard = React.memo(
  ({ product, onDelete, onEdit }: ProductsProp) => {
    const { viewMode } = useView();

    const handleDelete = (e: React.MouseEvent) => {
      e.preventDefault();
      if (window.confirm("Are you sure you want to delete this product?")) {
        onDelete?.(product.id);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.03, boxShadow: "0 15px 35px rgba(0,0,0,0.2)" }}
        className={`
        bg-white rounded-2xl shadow-md border border-gray-200 p-4 
        transition-transform duration-300 ease-out cursor-pointer
        ${
          viewMode === "list"
            ? "flex flex-row items-start gap-4"
            : "flex flex-col"
        }
      `}
      >
        <div className={`${viewMode === "list" ? "flex-shrink-0" : ""}`}></div>

        <div className="flex-1 flex flex-col justify-between mt-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <p className="text-xl font-semibold text-green-600 mt-1">
              ₹{product.price}
            </p>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {product.description}
            </p>
            <p className="text-gray-500 mt-1 text-sm">
              Category: {product.category}
            </p>
          </div>

          <div
            className={`mt-4 flex ${
              viewMode === "grid" ? "gap-3" : "flex-col gap-2 ml-4"
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                onEdit?.();
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Edit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }
);
