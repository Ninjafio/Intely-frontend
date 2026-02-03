export interface IProduct {
  id: string
  title: string
  price: number
  oldPrice?: number | null
  discount?: number | null
  rating: number
  stock: number
  imageUrl?: string | null
}

export interface IProductGridProps {
  products: IProduct[]
  loading?: boolean
}

export interface ICatalogFilters {
  q?: string
  groups?: string[]
  priceFrom?: number
  priceTo?: number
}

export interface IFilterSidebarProps {
  value: ICatalogFilters
  onChange: (next: ICatalogFilters) => void
  onReset: () => void
}

export type Product = IProductGridProps['products'][number]

export type ProductGridProps = IProductGridProps & {
  onBuy?: (product: Product) => void
}
