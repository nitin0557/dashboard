import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSearch } from "../store/productSlice";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.products.search);
  const products = useSelector((state: RootState) => state.products.items);

  const [inputValue, setInputValue] = useState(search);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearch(inputValue));
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue, dispatch]);

  const suggestions = useMemo(
    () =>
      products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  const handleSelect = useCallback(
    (value: string) => {
      setInputValue(value);
      dispatch(setSearch(value));
      setShowSuggestions(false);
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    dispatch(setSearch(""));
    setShowSuggestions(false);
  }, [dispatch]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search products..."
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            &times;
          </button>
        )}
      </div>

      {showSuggestions && search && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.slice(0, 5).map((s) => (
            <li
              key={s.id}
              onClick={() => handleSelect(s.title)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {s.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
