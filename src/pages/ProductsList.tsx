import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ProductCard } from "../components/ProductCard";
import Header from "../components/Header";
import { fetchProducts } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";

const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: products,
    search,
    status,
  } = useSelector((state: RootState) => state.products);
  const loading = status === "loading";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, products.length]);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

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

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOrder === "asc")
      result = [...result].sort((a, b) => a.price - b.price);
    else if (sortOrder === "desc")
      result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, search, selectedCategories, priceRange, sortOrder]);

  useEffect(() => {
    setVisibleCount(8);
  }, [search, selectedCategories, sortOrder, priceRange]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      setVisibleCount((prev) =>
        prev < filteredProducts.length ? prev + 8 : prev
      );
    }
  }, [filteredProducts.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  return (
    <div>
      <Header />

      <div className="pt-20">
        <Carousel
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
          }}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          className="mb-6"
        >
          <img
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
            alt="banner1"
            className="rounded-xl"
          />
          <img
            src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png"
            alt="banner2"
            className="rounded-xl"
          />
          <img
            src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png"
            alt="banner3"
            className="rounded-xl"
          />
        </Carousel>
      </div>

      <div className="px-4 pb-6 flex flex-col lg:flex-row gap-6">
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

            <div className="mb-6">
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

            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <input
                type="range"
                min={0}
                max={1000}
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-full"
              />
              <input
                type="range"
                min={0}
                max={1000}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full"
              />
              <p className="text-sm">
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading && (
            <div className="col-span-full flex justify-center items-center py-10">
              <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
            </div>
          )}

          {!loading && visibleProducts.length > 0
            ? visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            : !loading && (
                <p className="text-center text-gray-500 col-span-full mt-10">
                  No Products Found
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
