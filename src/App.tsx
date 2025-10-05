// App.tsx
import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./components/Profile";
import ProductsList from "./pages/ProductsList";

const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const AddToCart = lazy(() => import("./components/AddToCart"));
const Login = lazy(() => import("./components/Login"));

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Suspense
              fallback={<div className="text-center p-4">Loading...</div>}
            >
              <Routes>
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute role="Admin">
                      <Home />
                    </ProtectedRoute>
                  }
                />

                 <Route
                  path="/contact"
                  element={
                    <ProtectedRoute role="Admin">
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route path="/product/:id" element={<ProductDetails />} />

                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <AddToCart />
                    </ProtectedRoute>
                  }
                />
                 <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <ProductsList />
                    </ProtectedRoute>
                  }
                />

                <Route path="/login" element={<Login />} />
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
