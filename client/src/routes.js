import React from "react"
import { Routes, Route } from 'react-router-dom'
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { ProductPage } from "./pages/ProductPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DeliveryPage } from "./pages/DeliveryPage";
import { CartPage } from "./pages/CartPage";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  )
}
