import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/css/main.css';
import { CartProvider } from './context/CartContext.jsx'; // Importe o CartProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Envolva o App com o CartProvider */}
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)