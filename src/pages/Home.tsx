import React, { useEffect, useState, useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import Header from "../components/Header";
import { fetchProducts } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Pagination from "../common/Pagination";
import productData from "../data/products.json";
import { useView } from "../context/ViewContext";
import { Products } from "../types/types";
import { EditProductModal } from "../components/EditProductModal";
import { useNavigate } from "react-router-dom";
import { AddProductModal } from "../components/AddProductModal";
import { Table } from "../common/Table";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { viewMode } = useView();
  const [showAddModal, setShowAddModal] = useState(false);
const columns = [
  { header: "ID", accessor: "id" as keyof Products },

  { header: "Name", accessor: "name" as keyof Products, className: "font-medium" },

  {
    header: "Price",
    render: (product: Products) => (
      <span className="font-semibold text-green-600">
        ₹{product.price}
      </span>
    ),
  },

  { header: "Category", accessor: "category" as keyof Products, className: "capitalize" },

  {
    header: "Description",
    render: (product: Products) => (
      <div className="line-clamp-2 text-gray-600 text-sm max-w-[240px]">
        {product.description}
      </div>
    ),
  },

  {
    header: "Actions",
    render: (product: Products) => (
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => handleEditOpen(product)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => handleDeleteProduct(product.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    ),
  },
];


  const handleAddProduct = (product: Products) => {
    setProducts((prev) => [product, ...prev]);
  };

  const search = useSelector((state: RootState) => state.products.search);

  const [products, setProducts] = useState<Products[]>(productData);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleEditOpen = (product: Products) => {
    setEditingProduct(product);
  };

  const handleSaveProduct = (updated: Products) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === updated.id);
      if (exists) {
        return prev.map((p) => (p.id === updated.id ? updated : p));
      } else {
        return [updated, ...prev]; // add new product
      }
    });
    setEditingProduct(null);
    navigate("/home");
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => setCurrentPage(1), [search]);

  return (
    <div>
      <Header onAddProduct={() => setShowAddModal(true)} />

      <div className="pt-24 px-4 pb-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); 
              }}
              className="border rounded px-3 py-2"
            >
              {[5, 8, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num} per page
                </option>
              ))}
            </select>
          </div>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => handleEditOpen(product)}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl shadow border">
              <Table data={paginatedProducts} columns={columns} keyField="id" />
            </div>
          )}

          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={handleSaveProduct}
          />

          {showAddModal && (
            <AddProductModal
              onClose={() => setShowAddModal(false)}
              onAdd={handleAddProduct}
            />
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
