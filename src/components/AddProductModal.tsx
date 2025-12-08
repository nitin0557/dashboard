import React, { useState } from "react";
import { Products } from "../types/types";

interface AddProductModalProps {
  onClose: () => void;
  onAdd: (product: Products) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = React.memo(
  ({ onClose, onAdd }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [tags, setTags] = useState<string[]>([]);

    const handleSubmit = () => {
      if (!name || !category) {
        alert("Name and Category are required!");
        return;
      }

      const newProduct: Products = {
        id: Date.now(),
        name,
        price,
        category,
        description,
        stock,
        createdAt: new Date().toISOString(),
        isActive: true,
        tags,
      };

      onAdd(newProduct);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags.join(",")}
              onChange={(e) => setTags(e.target.value.split(","))}
              className="border p-2 rounded"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
);
