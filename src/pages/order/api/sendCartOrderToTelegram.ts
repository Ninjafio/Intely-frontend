import axios from 'axios'
import type { CartItem } from '@store/cart'

type CartOrderPayload = {
  name: string
  email: string
  phone: string
  comment?: string
  items: CartItem[]
}

const BOT_TOKEN = '8234620142:AAEb79Fl1rrbNajGDbtK6Y-iX3Tu3vebPqM'
const CHAT_ID = '-5089916086'

export async function sendCartOrderToTelegram(payload: CartOrderPayload) {
  const total = payload.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const lines = payload.items.map((i, idx) => {
    const rowTotal = i.price * i.qty
    return `${idx + 1}) ${i.title} (ID: ${i.id})\n    Кол-во: ${i.qty} шт.\n    Цена за шт.: ${i.price} руб.\n    Сумма: ${rowTotal} руб.`
  })

  const message = `НОВЫЙ ЗАКАЗ (корзина)
Имя: ${payload.name}
Email: ${payload.email}
Телефон: ${payload.phone}
Комментарий: ${payload.comment ?? '—'}

Состав заказа:\n${lines.join('\n\n')}

Итого: ${total} руб.`

  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: message,
  })
}

