import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // Assuming you have a global CSS file
import "./index.css"; // Tailwind CSS styles
import { CartProvider } from "./context/CartContext";

// Lazy load pages for better performance
const MainPage = lazy(() => import("./pages/MainPage"));
const Products = lazy(() => import("./pages/Products"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen">
         
          {/* Suspense for fallback loader while lazy pages load */}
          <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
