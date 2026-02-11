import { useState } from 'react'
import { useProductsQuery } from './api/queries'
import { FilterSidebar } from './ui/FilterSidebar'
import { ProductGrid } from './ui/ProductGrid'
import type { ICatalogFilters, IProduct } from './model'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import { addToCart } from '@store/cart'
import './ui/css/CatalogPage.css'

const INITIAL_FILTERS: ICatalogFilters = {
  q: '',
  groups: [],
  priceFrom: undefined,
  priceTo: undefined,
}

export default function CatalogPage() {
  const [filters, setFilters] = useState<ICatalogFilters>(INITIAL_FILTERS)
  const { data = [], isLoading } = useProductsQuery(filters)

// заказ через корзину, локальные стейты пока не используются

  const handleBuy = (product: IProduct) => {
    addToCart({
      id: product.id,
      title: product.title,
      brand: product.brand,
      article: product.article,
      price: product.price,
      oldPrice: product.oldPrice,
      imageUrl: product.imageUrl,
      qty: 1,
    })
  }

  return (
    <>
      <Header />
      <main className="catalog-main">
        <div className="catalog-container">
          <FilterSidebar 
            value={filters} 
            onChange={setFilters} 
            onReset={() => setFilters(INITIAL_FILTERS)} 
          />
          <div className="catalog-content">
            <ProductGrid products={data} loading={isLoading} onBuy={handleBuy} />
          </div>
        </div>
      </main>
	<Footer />
    </>
  )
}
