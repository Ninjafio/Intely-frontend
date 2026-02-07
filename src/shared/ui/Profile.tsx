import { setActiveModal } from "../../store"
import "../css/style.css"

export default function Profile() {
  return (
    <img className="header__btn" src="/Profile.svg" alt="Профиль" onClick={() => setActiveModal("auth")} />
  )
}
