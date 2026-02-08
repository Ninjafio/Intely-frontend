import { useState } from 'react'

const ClientInfo = () => {
  const [isLegalEntity, setIsLegalEntity] = useState(false)

  return (
    <div className="Client Info">
      <h2>Данные получателя</h2>
      <div className="selector__wrapper">
        <div
          className="cart-selector__btn"
          style={{ color: `${!isLegalEntity ? '#0075B1' : '#707070'}`, backgroundColor: `${!isLegalEntity ? '#F1F1F1' : '#F7F7F7'}` }}
          onClick={() => setIsLegalEntity(false)}
        >
          Физическое лицо
        </div>
        <div
          className="cart-selector__btn"
          style={{ color: `${isLegalEntity ? '#0075B1' : '#707070'}`, backgroundColor: `${isLegalEntity ? '#F1F1F1' : '#F7F7F7'}` }}
          onClick={() => setIsLegalEntity(true)}
        >
          Юридическое лицо
        </div>
      </div>
      {isLegalEntity ? (
        <div className="inputs__container">
          <div className="InputAndLabel">
            <label htmlFor="email_auth">ИНН</label>
            <input id="INN_cart" type="text" maxLength={11} placeholder="88005553535" required={true} />
          </div>
          <div className="InputAndLabel">
            <label htmlFor="email_auth">КПП</label>
            <input id="KPP_cart" type="text" maxLength={11} placeholder="88005553535" required={true} />
          </div>
          <div className="InputAndLabel">
            <label htmlFor="email_auth">Наименование</label>
            <input id="title_cart" type="text" maxLength={100} placeholder="ИП Пирогова" required={true} />
          </div>
        </div>
      ) : (
        <div className="inputs__container">
          <div className="InputAndLabel">
            <label htmlFor="email_auth">Фамилия</label>
            <input id="lastname_cart" type="text" maxLength={50} placeholder="Иванов" required={true} />
          </div>
          <div className="InputAndLabel">
            <label htmlFor="email_auth">Имя</label>
            <input id="firstname_cart" type="text" maxLength={50} placeholder="Иван" required={true} />
          </div>
          <div className="InputAndLabel">
            <label htmlFor="email_auth">Телефон</label>
            <input id="tel_cart" type="tel" maxLength={50} placeholder="+7 (999) 123-45-67" required={true} />
          </div>
          <div className="InputAndLabel">
            <label htmlFor="email_auth">Электронная почта</label>
            <input id="email_cart" type="email" maxLength={100} placeholder="mail@mail.ru" required={true} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientInfo
