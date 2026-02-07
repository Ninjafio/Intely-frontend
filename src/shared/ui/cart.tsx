import { setActiveModal } from "../../store"
import "../css/style.css"

export default function Cart() {
  return (
    <img className="header__btn" src="/Cart.svg" alt="Корзина" onClick={() => setActiveModal("auth")} />
  )
}
