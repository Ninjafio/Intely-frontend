import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'
import { STOCKS } from './api/mock'
import StockCard from './ui/StockCard'
import { useState } from 'react'
import './css/StocksPage.css'
import { Pagination } from '@widgets/pagination'

const StocksPage = () => {
  const [pageNumber, setPageNumber] = useState(0)

  const handleOnClick = (str: string) => {
    if (Number(str)) {
      setPageNumber(Number(str) - 1)
      return
    }
    if (str === 'left' && pageNumber != 0) {
      setPageNumber(pageNumber - 1)
      return
    }
    if (pageNumber != Math.ceil(STOCKS.length / 6)) {
      setPageNumber(pageNumber + 1)
      return
    }
  }

  return (
    <>
      <Header />
      <main className="StocksPage">
        <h1>Акции</h1>
        <div className="stocks__container">
          {STOCKS.slice(6 * pageNumber, 6 * pageNumber + 6).map((st) => (
            <StockCard key={st.id} id={st.id} subtitle={st.subtitle} title={st.title} description={st.description} imageURL={st.imageURL} />
          ))}
        </div>
        <Pagination handleOnClick={handleOnClick} pageNumber={pageNumber + 1} overallSize={STOCKS.length} pageSize={6} />
      </main>
      <Footer />
    </>
  )
}

export default StocksPage
