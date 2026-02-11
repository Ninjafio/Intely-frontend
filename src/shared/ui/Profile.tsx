import { useEffect, useState } from "react"
import { setActiveModal } from "../../store"
import "../css/style.css"
import { getMe, type Me } from "@shared/api/user"

export default function Profile() {
  const [open, setOpen] = useState(false)
  const [me, setMe] = useState<Me | null>(null)
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null

  useEffect(() => {
    if (!open || !token) return
    getMe().then(setMe).catch(() => setMe(null))
  }, [open, token])

  const onClick = () => {
    if (!token) {
      setActiveModal("auth")
      return
    }
    setOpen((v) => !v)
  }

  const logout = () => {
    localStorage.removeItem("jwt")
    setMe(null)
    setOpen(false)
    setActiveModal("auth")
  }

  return (
    <div className="relative">
      <img className="header__btn" src="/Profile.svg" alt="Профиль" onClick={onClick} />
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl p-4 z-30 sm:w-72">
          <div className="text-sm text-gray-500 mb-2">{me ? me.email : "Загрузка…"}</div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Баланс</span>
            <strong>{me?.balance ?? 0} ₽</strong>
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <span>Кредит</span>
            <strong>{me?.credit_limit ?? 0} ₽</strong>
          </div>
          <button
            className="w-full px-3 py-2 rounded-lg bg-[#0075B1] text-white text-sm mb-2"
            onClick={() => (window.location.href = "/profile")}
          >
            Личный кабинет
          </button>
          <button
            className="w-full px-3 py-2 rounded-lg border text-sm"
            onClick={logout}
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  )
}
