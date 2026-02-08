import { useState } from 'react'
import { useProductsQuery } from './api/queries'
import { FilterSidebar } from './ui/FilterSidebar'
import { ProductGrid } from './ui/ProductGrid'
import type { ICatalogFilters, IProduct } from './model'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import { OrderModal } from '@pages/order'
import './ui/css/CatalogPage.css'
import Modals from '@widgets/modals/ui/Modals'
import FilterTopBar from './ui/FilterTopBar'
import { BRANDS } from '@pages/home/api/mock'

const INITIAL_FILTERS: ICatalogFilters = {
  q: '',
  groups: [],
  priceFrom: undefined,
  priceTo: undefined,
}

export default function CatalogPage() {
  const [filters, setFilters] = useState<ICatalogFilters>(INITIAL_FILTERS)
  const { data = [], isLoading } = useProductsQuery(filters)

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const [isOrderOpen, setIsOrderOpen] = useState(false)

  const handleBuy = (product: IProduct) => {
    setSelectedProduct(product)
    setIsOrderOpen(true)
  }

  return (
    <>
      <Modals />
      <Header />
      <main className="catalog-main">
        <div className="catalog-container">
          <FilterSidebar value={filters} onChange={setFilters} onReset={() => setFilters(INITIAL_FILTERS)} />
          <div className="catalog-content">
          <FilterTopBar brands={BRANDS} />
            <ProductGrid products={data} loading={isLoading} onBuy={handleBuy} />
          </div>
        </div>
      </main>
      <Footer />

      <OrderModal isOpen={isOrderOpen} product={selectedProduct} onClose={() => setIsOrderOpen(false)} />
    </>
  )
}
