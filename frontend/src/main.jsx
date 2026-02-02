import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './CartContext.jsx'
import { WishlistProvider } from './WishlistContext.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import GlobalErrorBoundary from './components/GlobalErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
        <ThemeProvider>
          <GlobalErrorBoundary>
            <App />
          </GlobalErrorBoundary>
        </ThemeProvider>
      </WishlistProvider>
    </CartProvider>
  </BrowserRouter>
)
