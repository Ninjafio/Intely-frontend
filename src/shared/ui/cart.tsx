import { useStore } from 'effector-react'
import { useNavigate } from 'react-router'
import { $cartCount } from '@store/cart'
import { APP_PATHS } from '@shared/config'
import '../css/style.css'

export default function Cart() {
  const count = useStore<number>($cartCount)
  const navigate = useNavigate()

  return (
    <button className="header__btn relative" onClick={() => navigate(APP_PATHS.CART)} aria-label="Корзина">
      <img src="/Cart.svg" alt="Корзина" />
      {count > 0 && <span className="cart-badge">{count}</span>}
    </button>
  )
}
