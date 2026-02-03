import { useQuery } from '@tanstack/react-query'
import type { ProductDetail, ProductListItem, Review } from './types'
import { mockProductDetail, mockRelated, mockReviews } from './mock'
import { GET_PROD_BASE_URL } from '@shared/config/query-client'
import axios from 'axios'

const KEY = {
  product: (id: string) => ['item', 'product', id] as const,
  related: (id: string) => ['item', 'related', id] as const,
  reviews: (id: string) => ['item', 'reviews', id] as const,
}

export function useProductQuery(id: string) {
  return useQuery<ProductDetail>({
    queryKey: KEY.product(id),
    queryFn: async () => {
      try {
        const res = await fetch(`${GET_PROD_BASE_URL()}/api/products/${id}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as ProductDetail

        const { images, specs, breadcrumbs, ...rest } = data ?? ({} as ProductDetail)
        return {
          ...rest,
          images: images ?? [],
          specs: specs ?? [],
          breadcrumbs: breadcrumbs ?? [],
        }
      } catch {
        return mockProductDetail(id)
      }
    },
  })
}

export function useRelatedProductsQuery(id: string) {
  return useQuery<ProductListItem[]>({
    queryKey: KEY.related(id),
    queryFn: async () => {
      try {
        const res = await fetch(`/api/products/${id}/related`)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return (await res.json()) as ProductListItem[]
      } catch {
        return mockRelated
      }
    },
  })
}

export function useReviewsQuery(id: string) {
  return useQuery<Review[]>({
    queryKey: KEY.reviews(id),
    queryFn: async () => {
      try {
        const res = await fetch(`${GET_PROD_BASE_URL()}/api/reviews/${id}`)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return (await res.json()) as Review[]
      } catch {
        return mockReviews
      }
    },
  })
}

export async function createReview(review: any) {
  try {
    const response = await axios.post(`${GET_PROD_BASE_URL()}/api/reviews/create`, review)
    return response.status
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error)
    throw new Error('Не удалось отправить заказ в Telegram')
  }
}
