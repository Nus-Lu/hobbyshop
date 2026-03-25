// import { useEffect, useState } from 'react'
// //import reactLogo from './assets/react.svg'
// //import viteLogo from './assets/vite.svg'
// //import heroImg from './assets/hero.png'
// import './App.css'
// import axios from 'axios'
import { Routes, Route } from "react-router-dom"
import { useState } from "react";
import Login from "./page/Login"
import Dashboard from "./page/admin/Dashboard"
import AdminProducts from "./page/admin/AdminProducts"
import LoadingModal  from "./page/Loading"

function App() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading..."); // Loading訊息
  return (
    <div className="App">
      <LoadingModal show={loading} message={loadingMessage} />
      <Routes>
        <Route path="/login" element={<Login setLoading={setLoading} setMessage={setLoadingMessage} />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts setLoading={setLoading} setMessage={setLoadingMessage}/>} />
        </Route>
      </Routes>
    </div>
  )
}
export default App
