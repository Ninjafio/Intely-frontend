import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { CartItemCard, SummaryCard, CheckoutModal } from './components'
import { $cartItems, $cartTotals, toggleSelectAll } from '@store/cart'
import type { CartItem } from '@store/cart'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import './cart.css'

export function CartPage() {
  const items = useStore<CartItem[]>($cartItems)
  const totals = useStore($cartTotals)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const allSelected = items.length > 0 && items.every((i) => i.selected)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header />
      <main className="cart-page">
        <div className="container">
          <div className="page-title">
            <h1>Корзина</h1>
            <div className="count">{totals.count} товаров</div>
          </div>

          <div className="grid">
            <section className="card cart" aria-label="Список товаров в корзине">
              <div className="cart__head">
                <label className="check">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                  Выбрать все
                </label>
                <div className="cart__subhint">
                  {allSelected ? 'Выбраны все товары' : 'Часть товаров не выбрана'}
                </div>
              </div>

              {items.length === 0 && (
                <div className="cart__empty">Ваша корзина пуста</div>
              )}

              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}

              {items.length > 0 && (
                <div className="cart__footer">
                  <div className="cart__total">
                    <small>Итого</small>
                    <div>{totals.total.toLocaleString('ru-RU')} ₽</div>
                  </div>
                </div>
              )}
            </section>

            <SummaryCard totals={totals} onCheckout={() => setCheckoutOpen(true)} />
          </div>
        </div>
        <CheckoutModal open={checkoutOpen} items={items} total={totals.total} onClose={() => setCheckoutOpen(false)} />
      </main>
      <Footer />
    </>
  )
}
