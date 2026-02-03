export interface OrderFormData {
  name: string
  email: string
  phone: string
  comment: string
  productId?: number
  productTitle?: string
  productPrice?: number
}

export interface TelegramOrderData extends OrderFormData {
  id: string
  timestamp: Date
}

export interface TelegramSendResponse {
  ok: boolean
  result: {
    message_id: number
    chat: {
      id: number
      title?: string
      username?: string
      type: string
    }
    date: number
    text: string
  }
}
