import { useState } from 'react'
import { sendCartOrderToTelegram } from '@pages/order/api/sendCartOrderToTelegram'
import { createOrdersBulk } from '@shared/api/order'
import type { CartItem } from '@store/cart'
import { clearCart } from '@store/cart'

type Props = {
  open: boolean
  items: CartItem[]
  total: number
  onClose: () => void
}

export function CheckoutModal({ open, items, total, onClose }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const selected = items.filter((i) => i.selected)

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected.length) return
    try {
      setSubmitting(true)
      await createOrdersBulk(
        selected.map((i) => ({
          productId: i.id,
          price: i.price,
          name,
          email,
          phone,
          comment,
        })),
        comment,
      )

      // Отправляем единым сообщением в Telegram
      await sendCartOrderToTelegram({ name, email, phone, comment, items: selected })
      clearCart()
      onClose()
      alert('Заказ оформлен, мы свяжемся с вами')
    } catch (err) {
      console.error('checkout error', err)
      alert('Не удалось оформить заказ')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="checkout-backdrop" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Оформление заказа</h3>
        <p className="checkout-total">К оплате: {total.toLocaleString('ru-RU')} ₽</p>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            Имя
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Телефон
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label>
            Комментарий
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
          </label>
          <button type="submit" className="pay-btn" disabled={isSubmitting || !selected.length}>
            {isSubmitting ? 'Отправка...' : 'Оплатить'}
          </button>
        </form>
      </div>
    </div>
  )
}
