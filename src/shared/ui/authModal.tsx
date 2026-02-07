import { setActiveModal } from '../../store'
import '../css/authModal.css'

const AuthModal = () => {

    const onAuth = () => {
        alert("asd")
    }

  return (
    <div className="Modal">
      <div className="AuthModal__title">
        <h3>Авторизация</h3>
        <button className="close__modal" onClick={() => setActiveModal('')}></button>
      </div>
      <form action={onAuth}>
    <div className="InputAndLabel">
        <label htmlFor="email_auth">Электронная почта</label>
        <input id="email_auth" type="email" placeholder="mail@mail.ru" required={true} />
    </div>
    <div className="InputAndLabel">
        <label htmlFor="password_auth">Пароль</label>
        <input id="password_auth" type="password" placeholder="Пароль" required={true} />
    </div>
        <input
          type="submit"
          className="h-[44px] bg-[#007BC1] text-white rounded-[8px] font-medium w-full hover:bg-[#0267a3] transition"
          value="Вход"
        />
      </form>
      <a className="password-forgot__link" href="#">
        Забыли пароль?
      </a>
    </div>
  )
}

export default AuthModal
