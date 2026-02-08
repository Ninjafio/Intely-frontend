import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { MOCK_PICKUPS, type IPickupPoint } from '../api/mock'

interface IPickupPoints {
  pickups: IPickupPoint[]
}

const PickUpPoints = ({ pickups }: IPickupPoints) => {
  return (
    <>
      {pickups.map((point) => (
        <div className="pickup-list__item">
          <div className="pickup-list__item_left">
            <span className="pickup-type">{point.type}</span>
            <span className="pickup-address">{point.address}</span>
            <span className="pickup-schedule">{point.schedule}</span>
          </div>
          <img src="/pickup.svg" alt=">" />
        </div>
      ))}
    </>
  )
}

const DeliveryInfo = () => {
  const [isPickup, setIsPickup] = useState(false)
  const [isMap, setIsMap] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('online')

  return (
    <div className="Delivery Info">
      <h2>Способ получения</h2>
      <div className="selector__wrapper">
        <div
          className="cart-selector__btn"
          style={{ color: `${!isPickup ? '#0075B1' : '#707070'}`, backgroundColor: `${!isPickup ? '#F1F1F1' : '#F7F7F7'}` }}
          onClick={() => setIsPickup(false)}
        >
          Доставка
        </div>
        <div
          className="cart-selector__btn"
          style={{ color: `${isPickup ? '#0075B1' : '#707070'}`, backgroundColor: `${isPickup ? '#F1F1F1' : '#F7F7F7'}` }}
          onClick={() => setIsPickup(true)}
        >
          Самовывоз
        </div>
      </div>
      {isPickup ? (
        <div className="pickup__container">
          <div className="pickup-top">
            <label className="search-wrapper">
              <input type="search" className="search-input__cart" placeholder="Поиск" />
              <span className="search-icon-pos">
                <SearchIcon />
              </span>
            </label>

            <div className="selector__wrapper">
              <div
                className="cart-selector__btn"
                style={{ color: `${!isMap ? '#0075B1' : '#707070'}`, backgroundColor: `${!isMap ? '#F1F1F1' : '#F7F7F7'}` }}
                onClick={() => setIsMap(false)}
              >
                Список
              </div>
              <div
                className="cart-selector__btn"
                style={{ color: `${isMap ? '#0075B1' : '#707070'}`, backgroundColor: `${isMap ? '#F1F1F1' : '#F7F7F7'}` }}
                onClick={() => setIsMap(true)}
              >
                Карта
              </div>
            </div>
          </div>
          {!isMap ? (
            <div className="pickup-list">
              <PickUpPoints pickups={MOCK_PICKUPS} />
            </div>
          ) : (
            <div className="pick-up__content">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aca8c0383a564ba39ab2e0d055adfe12316f2853ff3243effaf73a3683fa040ee&amp;source=constructor"
                width="100%"
                height="400"
                frameBorder="0"
              ></iframe>
            </div>
          )}
        </div>
      ) : (
        <div className="delivery__container">
          <div className="inputs__container">
            <div className="InputAndLabel">
              <label htmlFor="email_auth">Город</label>
              <input id="city_cart" type="text" maxLength={50} placeholder="Челябинск" required={true} />
            </div>
            <div className="InputAndLabel">
              <label htmlFor="email_auth">Дом</label>
              <input id="home_cart" type="text" maxLength={50} placeholder="55А" required={true} />
            </div>
            <div className="InputAndLabel">
              <label htmlFor="email_auth">Улица</label>
              <input id="city_cart" type="text" maxLength={50} placeholder="Пушкина" required={true} />
            </div>
            <div className="InputAndLabel">
              <label htmlFor="email_auth">Квартира</label>
              <input id="app_cart" type="text" maxLength={50} placeholder="55" required={true} />
            </div>
            <div className="InputAndLabel">
              <label htmlFor="email_auth">Комментарий к заказу</label>
              <textarea maxLength={500} name="comm_cart" id="comm_cart" placeholder="Комментарий к заказу"></textarea>
            </div>
          </div>
          <p className="delivery_date">
            Доставка до {15.11}, стоимость: {700} ₽
          </p>
          <h2>Способ оплаты</h2>
          <div className="selector__wrapper">
            <div
              className="cart-selector__btn"
              style={{
                color: `${paymentMethod === 'online' ? '#0075B1' : '#707070'}`,
                backgroundColor: `${paymentMethod === 'online' ? '#F1F1F1' : '#F7F7F7'}`,
              }}
              onClick={() => setPaymentMethod('online')}
            >
              Оплата онлайн
            </div>
            <div
              className="cart-selector__btn"
              style={{
                color: `${paymentMethod === 'SBP' ? '#0075B1' : '#707070'}`,
                backgroundColor: `${paymentMethod === 'SBP' ? '#F1F1F1' : '#F7F7F7'}`,
              }}
              onClick={() => setPaymentMethod('SBP')}
            >
              СБП
            </div>
            <div
              className="cart-selector__btn"
              style={{
                color: `${paymentMethod === 'onReceipt' ? '#0075B1' : '#707070'}`,
                backgroundColor: `${paymentMethod === 'onReceipt' ? '#F1F1F1' : '#F7F7F7'}`,
              }}
              onClick={() => setPaymentMethod('onReceipt')}
            >
              При получении
            </div>
          </div>
          <input type="checkbox" required /> Я принимаю условия пользовательского соглашения
        </div>
      )}
    </div>
  )
}

export default DeliveryInfo
