import { createEvent, createStore } from 'effector'

export type CartItem = {
  id: number | string
  title: string
  brand?: string | null
  article?: string | null
  price: number
  oldPrice?: number | null
  qty: number
  selected: boolean
  imageUrl?: string | null
}

const loadInitial = (): CartItem[] => {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem('cart')
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    if (Array.isArray(parsed)) return parsed
    return []
  } catch (e) {
    console.warn('Failed to parse cart from storage', e)
    return []
  }
}

export const addToCart = createEvent<Omit<CartItem, 'qty' | 'selected'> & { qty?: number }>()
export const removeFromCart = createEvent<CartItem['id']>()
export const updateQty = createEvent<{ id: CartItem['id']; qty: number }>()
export const toggleSelect = createEvent<CartItem['id']>()
export const toggleSelectAll = createEvent<boolean>()
export const clearCart = createEvent<void>()

export const $cartItems = createStore<CartItem[]>(loadInitial())
  .on(addToCart, (state, payload) => {
    const nextQty = Math.max(1, payload.qty ?? 1)
    const existingIdx = state.findIndex((i) => i.id === payload.id)
    if (existingIdx >= 0) {
      const next = [...state]
      next[existingIdx] = {
        ...next[existingIdx],
        qty: next[existingIdx].qty + nextQty,
      }
      return next
    }
    return [
      ...state,
      {
        ...payload,
        qty: nextQty,
        selected: true,
      },
    ]
  })
  .on(removeFromCart, (state, id) => state.filter((i) => i.id !== id))
  .on(updateQty, (state, { id, qty }) => {
    const sanitized = Math.max(1, qty)
    return state.map((i) => (i.id === id ? { ...i, qty: sanitized } : i))
  })
  .on(toggleSelect, (state, id) => state.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)))
  .on(toggleSelectAll, (state, value) => state.map((i) => ({ ...i, selected: value })))
  .reset(clearCart)

$cartItems.watch((items) => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem('cart', JSON.stringify(items))
})

export const $cartCount = $cartItems.map((items) => items.reduce((sum, item) => sum + item.qty, 0))

export const $cartTotals = $cartItems.map((items) => {
  const selected = items.filter((i) => i.selected)
  const total = selected.reduce((sum, i) => sum + i.price * i.qty, 0)
  const oldTotal = selected.reduce((sum, i) => sum + (i.oldPrice ?? i.price) * i.qty, 0)
  const discount = Math.max(0, oldTotal - total)
  const count = selected.reduce((sum, i) => sum + i.qty, 0)
  return { total, oldTotal, discount, count }
})

export type CartTotals = ReturnType<typeof $cartTotals.getState>
