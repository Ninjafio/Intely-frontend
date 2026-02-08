import { BRANDS } from './api/mock'
import type { IProduct } from '@pages/catalog/model'
import { OrderModal } from '@pages/order'
import Brands from '@widgets/brands/ui/Brands'
import { Discount } from '@widgets/discount'
import { Feedback } from '@widgets/feedback'
import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'
import { Hero } from '@widgets/hero'
import Modals from '@widgets/modals/ui/Modals'
import { News } from '@widgets/news'
import { Popular } from '@widgets/popular'
import { useState } from 'react'

export default function HomePage() {
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
      <Hero />
      <Discount />
      <Popular onBuy={handleBuy} />
      <Feedback />
      <Brands brands={BRANDS} />
      <News />
      <Footer />

      <OrderModal isOpen={isOrderOpen} product={selectedProduct} onClose={() => setIsOrderOpen(false)} />
    </>
  )
}
