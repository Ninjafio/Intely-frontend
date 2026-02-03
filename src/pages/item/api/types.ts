export type ProductListItem = {
  id: string
  title: string
  price: number
  oldPrice?: number | null
  discount?: number | null 
  rating: number 
  stock: number
  imageUrl?: string | null
}

export type ProductSpec = { label: string; value: string }

export type Breadcrumb = { label: string; href?: string }

export type ProductDetail = ProductListItem & {
  description?: string | null
  images: string[] 
  specs: ProductSpec[]
  breadcrumbs: Breadcrumb[]
}

export type Review = {
  id: string
  author: string
  rating: number 
  comment: string
  createdAt: string 
}