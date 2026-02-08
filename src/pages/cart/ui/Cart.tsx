import { useUnit } from 'effector-react'
import { $Cart } from '../../../store/index'
import type { IProduct } from '@pages/catalog/model'
import { useState } from 'react'

interface ICartItems {
  cart: IProduct[]
}

const CartItems = ({ cart }: ICartItems) => {
  const [isSlice, setIsSlice] = useState(true)
  return (
    <>
      {cart.slice(0, isSlice ? 3 : cart.length).map((i) => (
        <div className="cart__item">
          {i.imageUrl ? (
              <img src={i.imageUrl} alt={i.title} />
          ) : (
              <img src="/no-image.png" alt={i.title} />
          )}
          <div className="cart__item_right">
            <div className="cart__item_right-top">
              <p className='cart__item-title'>{i.title}</p>
              <p className='cart__item-price'>{i.price + " ₽"}</p>
            </div>
          <div className="cart__item_right-bottom">
            <span style={{color: "#929292", fontSize: 12}}>{1} шт</span>
            <img width={16} height={18} src="/bucket.svg" alt="Удалить" />
          </div>
          </div>
        </div>
      ))}
      <span style={{cursor: "pointer", color: "#0075B1"}} onClick={() => setIsSlice(!isSlice)}>{isSlice ? "Смотреть все" : "Свернуть"}</span>
    </>
  )
}

const Cart = () => {
  const cart = useUnit($Cart)

  return (
    <div className="cart__wrapper">
      <div className="Cart">
        <h2>
          Товары в заказе <span style={{ color: '#929292' }}>({cart.length})</span>
        </h2>
        {cart && <CartItems cart={cart} />}<br/>
        <div className="price">
        <span>Итого</span>
        <span>{0.00} ₽</span>
        </div>
      </div>
    </div>
  )
}

//<ArrowRight className="w-4 h-4" />

export default Cart
