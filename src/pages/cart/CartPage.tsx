import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import Modals from '@widgets/modals/ui/Modals'
import './css/CartPage.css'
import ClientInfo from './ui/ClientInfo'
import DeliveryInfo from './ui/DeliveryInfo'
import Cart from './ui/Cart'

export default function CartPage() {
  return (
    <>
      <Modals />
      <Header />
      <main className="cart-main">
        <div className="left">
          <h1>Оформление заказа</h1>
          <ClientInfo />
          <DeliveryInfo />
        </div>
        <Cart />
      </main>
      <Footer />
    </>
  )
}
