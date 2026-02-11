import { BRANDS } from '@pages/catalog/config/brands'
import type { IProduct } from '@pages/catalog/model'
import { addToCart } from '@store/cart'
import Brands from '@widgets/brands/ui/Brands'
import { Discount } from '@widgets/discount'
import { Feedback } from '@widgets/feedback'
import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'
import { Hero } from '@widgets/hero'
import Modals from '@widgets/modals/ui/Modals'
import { News } from '@widgets/news'
import { Popular } from '@widgets/popular'
// no local state needed

export default function HomePage() {
// заказ через корзину, локальные стейты не нужны

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
			<Modals />
			<Header />
			<Hero />
			<Discount />
			<Popular onBuy={handleBuy} />
			<Feedback />
			<Brands brands={BRANDS} />
		<News />
		<Footer />
		</>
	)
}
