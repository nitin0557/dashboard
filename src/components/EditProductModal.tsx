import React, { useState, useEffect } from "react";
import { Products } from "../types/types";

type EditProductModalProps = {
  product: Products | null;
  onClose: () => void;
  onSave: (updated: Products) => void;
};

export const EditProductModal: React.FC<EditProductModalProps> = React.memo(
  ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
    });

    const [errors, setErrors] = useState({
      name: "",
      price: "",
      category: "",
    });

    useEffect(() => {
      if (product) {
        setFormData({
          name: product.name,
          price: String(product.price),
          category: product.category,
          stock: String(product.stock ?? ""),
          description: product.description ?? "",
        });
      }
    }, [product]);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
      const newErrors = {
        name: formData.name ? "" : "Name is required",
        price:
          formData.price && Number(formData.price) > 0
            ? ""
            : "Valid price is required",
        category: formData.category ? "" : "Category is required",
      };

      setErrors(newErrors);

      return !newErrors.name && !newErrors.price && !newErrors.category;
    };

    const handleSubmit = () => {
      if (!validate()) return;

      onSave({
        ...product!,
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        description: formData.description,
      });

      onClose();
    };

    if (!product) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>

          <label className="block mb-2">
            <span className="font-medium">Name *</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </label>

          <label className="block mb-2">
            <span className="font-medium">Price *</span>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </label>

          <label className="block mb-2">
            <span className="font-medium">Category *</span>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </label>

          {/* STOCK */}
          <label className="block mb-2">
            <span className="font-medium">Stock</span>
            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </label>

          <label className="block mb-4">
            <span className="font-medium">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
);
