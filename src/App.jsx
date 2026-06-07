import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NunuWidget from './components/NunuWidget'
import Home from './pages/Home'
import Restaurants from './pages/Restaurants'
import RestaurantDetail from './pages/RestaurantDetail'
import Cart from './pages/Cart'
import { LocaleProvider } from './context/LocaleContext'
import { CartProvider } from './context/CartContext'
import './App.css'

export default function App() {
  return (
    <LocaleProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="restaurants" element={<Restaurants />} />
              <Route path="restaurants/:id" element={<RestaurantDetail />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
          <NunuWidget />
        </HashRouter>
      </CartProvider>
    </LocaleProvider>
  )
}
