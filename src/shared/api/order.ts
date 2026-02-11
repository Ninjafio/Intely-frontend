import axios from 'axios'
import { GET_PROD_BASE_URL } from '@shared/config/query-client'

export type OrderPayload = {
  productId: number | string
  price: number
  name: string
  email: string
  phone: string
  comment?: string
}

const authHeaders = () => {
  if (typeof localStorage === 'undefined') return undefined
  const t = localStorage.getItem('jwt')
  return t ? { Authorization: `Bearer ${t}` } : undefined
}

/**
 * Создает одну запись заказа на бэкенде.
 */
export async function createOrder(payload: OrderPayload): Promise<void> {
  await axios.post(
    `${GET_PROD_BASE_URL()}/api/orders/create`,
    {
      productId: Number(payload.productId),
      price: Math.round(payload.price),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      comment: payload.comment ?? null,
    },
    {
      headers: authHeaders(),
    },
  )
}

/**
 * Создает несколько заказов последовательно для выбранных товаров.
 */
export async function createOrdersBulk(items: OrderPayload[], commonComment?: string): Promise<void> {
  for (const item of items) {
    await createOrder({ ...item, comment: commonComment ?? item.comment })
  }
}
