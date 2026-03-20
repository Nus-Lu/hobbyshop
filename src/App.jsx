// import { useEffect, useState } from 'react'
// //import reactLogo from './assets/react.svg'
// //import viteLogo from './assets/vite.svg'
// //import heroImg from './assets/hero.png'
// import './App.css'
// import axios from 'axios'
import { Routes, Route } from "react-router-dom"
import Login from "./page/Login"
import Dashboard from "./page/admin/Dashboard"
import AdminProducts from "./page/admin/AdminProducts"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App
