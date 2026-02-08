import { Link } from "react-router"
import { useUnit } from "effector-react"
import { $Cart } from "../../store/index"
import "../css/style.css"

export default function Cart() {
  const cart = useUnit($Cart)
  return (
    <Link to={"/cart"}>
      {cart.length > 0 && (
        <div className="cart_length">
          {cart.length > 9 ? "9+" : cart.length}
        </div>
      )}
    <img className="header__btn" src="/Cart.svg" alt="Корзина" />
    </Link>
  )
}
