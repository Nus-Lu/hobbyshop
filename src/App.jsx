// import { useEffect, useState } from 'react'
// //import reactLogo from './assets/react.svg'
// //import viteLogo from './assets/vite.svg'
// //import heroImg from './assets/hero.png'
// import './App.css'
// import axios from 'axios'
import { Routes, Route } from "react-router-dom"
import { LoadingProvider } from "./page/LoadingContext";
// import { useState } from "react";
import Login from "./page/Login"
import Dashboard from "./page/admin/Dashboard"
import AdminProducts from "./page/admin/AdminProducts"
import AdminCoupons from "./page/admin/AdminCoupons";
import AdminOrders from "./page/admin/AdminOrders";
import FrontLayout from "./page/front/FrontLayout";
import Home from "./page/front/Home";
import Products from "./page/front/Products";
import ProductDetail from "./page/front/ProductDetail";
// import LoadingModal  from "./page/Loading"

function App() {
  // const [loading, setLoading] = useState(false);
  // const [loadingMessage, setLoadingMessage] = useState("Loading..."); // Loading訊息
  return (
    <div className="App">
      <LoadingProvider>
        <Routes>
          <Route path="/" element={<FrontLayout />} >
            <Route path="" element={<Home />} ></Route>
            <Route path="products" element={<Products />} ></Route>
            <Route path="product/:id" element={<ProductDetail />} ></Route>
          </Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<AdminProducts />} ></Route>
            <Route path="coupons" element={<AdminCoupons />} ></Route>
            <Route path="orders" element={<AdminOrders />} ></Route>
          </Route>
        </Routes>
      </LoadingProvider>
    </div>
  )
}
export default App
