import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

const DELIVERY_FEE = 10
const SERVICE_FEE = 2

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (item, restaurantId, restaurantName) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id)
      if (existing) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, qty: 1, restaurantId, restaurantName },
      ]
    })
  }

  const setQty = (id, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => (p.id === id ? { ...p, qty } : p)),
    )
  }

  const clear = () => setItems([])

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
    return {
      subtotal,
      deliveryFee: DELIVERY_FEE,
      serviceFee: SERVICE_FEE,
      total: subtotal + DELIVERY_FEE + SERVICE_FEE,
      count: items.reduce((s, i) => s + i.qty, 0),
    }
  }, [items])

  return (
    <CartContext.Provider value={{ items, addItem, setQty, clear, ...totals }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
