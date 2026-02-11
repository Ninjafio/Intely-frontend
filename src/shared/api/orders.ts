import axios from 'axios'
import { GET_PROD_BASE_URL } from '@shared/config/query-client'

export type OrderRow = {
  id: number
  main_good_id: number
  price: number
  status: string
  date?: string | null
}

const token = () => (typeof localStorage !== 'undefined' ? localStorage.getItem('jwt') : null)

export async function getMyOrders(): Promise<OrderRow[]> {
  const t = token()
  if (!t) throw new Error('Нет токена')
  const { data } = await axios.get<OrderRow[]>(`${GET_PROD_BASE_URL()}/api/orders/me`, {
    headers: { Authorization: `Bearer ${t}` },
  })
  return data
}
