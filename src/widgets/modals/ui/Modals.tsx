import { useUnit } from "effector-react"
import { $ActiveModal, setActiveModal } from "../../../store"
import AuthModal from "@shared/ui/authModal"
import "../css/style.css"

const Modals = () => {
    const ActiveModal = useUnit($ActiveModal)

  return (
    <>
        <div style={{display: `${ActiveModal ? "block" : "none"}`}} onClick={() => setActiveModal("")} className="modal__background"></div>
      {ActiveModal === "auth" && (
        <AuthModal />
      )}
      {ActiveModal === "todo" && (
        <div className="todo">
            
        </div>
      )}
    </>
  )
}

export default Modals