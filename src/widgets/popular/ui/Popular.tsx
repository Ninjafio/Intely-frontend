import { useProductsQuery } from '@pages/catalog/api/queries'
import type { ICatalogFilters, IProductGridProps } from '@pages/catalog/model'
import { ProductGrid } from '@pages/catalog/ui/ProductGrid'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

type Product = IProductGridProps['products'][number]

type PopularProps = {
  onBuy?: (product: Product) => void
}

export default function Popular({ onBuy }: PopularProps) {
  const INITIAL_FILTERS: ICatalogFilters = {
    q: '',
    groups: [],
    priceFrom: undefined,
    priceTo: undefined,
  }

  const [filters] = useState<ICatalogFilters>(INITIAL_FILTERS)
  const { data = [], isLoading } = useProductsQuery(filters)
  const convertedData = data.slice(0, 5)

  return (
    <div className="bg-[#F7F7F7]">
      <div className="max-w-[1442px] mx-auto py-[50px] px-10">
        <div className="flex justify-between items-center mb-[50px]">
          <h2 className="text-[#0B0D0D] text-2xl font-medium">Популярные товары</h2>

          <div className="flex items-center gap-2">
            <button>
              <ChevronLeft />
            </button>
            <div className="h-[34px] w-[1px] bg-[#313131]" />
            <button>
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="flex-1">
          <ProductGrid products={convertedData} loading={isLoading} onBuy={onBuy} />
        </div>
      </div>
    </div>
  )
}
