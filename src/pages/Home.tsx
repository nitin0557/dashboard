import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ProductCard } from "../components/ProductCard";
import Header from "../components/Header";
import { fetchProducts } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Pagination from "../common/Pagination";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, search, status } = useSelector(
    (state: RootState) => state.products
  );
  const loading = status === "loading";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (sortOrder === "asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortOrder === "desc")
      result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, search, selectedCategories, sortOrder]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts.length]
  );

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredProducts, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategories, sortOrder]);

  // 🧠 memoize page change handler
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-24 px-4 pb-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 mb-4 lg:mb-0">
          <div className="bg-white p-4 rounded-xl shadow lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="form-checkbox"
                    />
                    <span className="capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Sort by Price</h3>
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "asc" | "desc" | "none")
                }
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="none">None</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading && (
              <p className="text-center text-gray-600 col-span-full">
                Loading....
              </p>
            )}
            {!loading && paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              !loading && (
                <p className="text-center text-gray-500 col-span-full mt-10">
                  No Products Found
                </p>
              )
            )}
          </div>

          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
