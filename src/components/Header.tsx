import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../hooks/useAuth";
import { useView } from "../context/ViewContext";

const Header = ({ onAddProduct }: { onAddProduct?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { viewMode, toggleView } = useView();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      navigate(`/products?search=${debouncedSearch}`);
    } else if (location.pathname === "/products") {
      navigate(`/products`);
    }
  }, [debouncedSearch, navigate, location.pathname]);

  // memoized mobile nav toggle
  const toggleMobileNav = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/home" className="text-2xl mr-2 font-bold text-blue-600">
            MyStore
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>

            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <SearchBar />
          </nav>

          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <button
              onClick={toggleView}
              className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition"
            >
              {viewMode === "grid" ? "📄 List View" : "🔲 Grid View"}
            </button>

            {onAddProduct && (
              <button
                onClick={onAddProduct}
                className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition"
              >
                + Add Product
              </button>
            )}

            {!user ? (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Hi, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end items-center">
            {/* Hamburger button */}
            <button
              onClick={toggleMobileNav}
              className="md:hidden sm:w-10 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              {open ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          <SearchBar />

          {!user ? (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
              <span className="text-gray-700 p-1">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
