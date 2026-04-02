import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import './stylesheets/all.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './stylesheets/login.scss'
import App from './App.jsx'
import axios from 'axios'
import { HashRouter } from 'react-router-dom'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
