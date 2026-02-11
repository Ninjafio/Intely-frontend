import axios from 'axios'
import type { OrderFormData, TelegramOrderData, TelegramSendResponse } from '../model'
import { createOrder } from '@shared/api/order'

export async function sendOrderToTelegram(orderData: OrderFormData): Promise<TelegramSendResponse> {
  const botToken = '8234620142:AAEb79Fl1rrbNajGDbtK6Y-iX3Tu3vebPqM'
  const chatId = '-5089916086'

  const telegramData: TelegramOrderData = {
    ...orderData,
    id: `ORDER-${Date.now()}`,
    timestamp: new Date(),
  }

  const message = `НОВЫЙ ЗАКАЗ
        №: ${telegramData.id}
        Имя: ${telegramData.name}
        Email: ${telegramData.email}
        Телефон: ${telegramData.phone}
        Комментарий: ${telegramData.comment}
        ${
          telegramData.productId
            ? `Товар: ${telegramData.productTitle}
        Цена: ${telegramData.productPrice} руб.
        ID товара: ${telegramData.productId}`
            : 'Товар: Не указан'
        }
        Дата: ${telegramData.timestamp.toLocaleString('ru-RU')}
    `

  try {
    // 1) сохраняем заказ в нашу БД со статусом по умолчанию
    await createOrder({
      productId: orderData.productId ?? 0,
      price: orderData.productPrice ?? 0,
      name: orderData.name,
      email: orderData.email,
      phone: orderData.phone,
      comment: orderData.comment,
    })

    const response = await axios.post<TelegramSendResponse>(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    })
    return response.data
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error)
    throw new Error('Не удалось отправить заказ в Telegram')
  }
}
