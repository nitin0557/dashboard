// App.tsx
import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./components/Profile";
import { ViewProvider } from "./context/ViewContext";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/Login"));

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ViewProvider>
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


                <Route path="/" element={<Login />} />
              </Routes>
            </Suspense>
          </Router>
        </ViewProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
