import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const newsItems = [
  {
    id: 1,
    image: '/news-1.png',
    title: 'Новая поставка оригинальных запчастей',
    text: 'Мы обновили склад — в наличии новые позиции. Быстрая отгрузка и гарантия качества на все детали.',
    date: '21.11.2025',
  },
  {
    id: 2,
    image: '/news-2.png',
    title: 'Теперь доставка в день заказа!',
    text: 'Для клиентов из Челябинска и области — экспресс-доставка автозапчастей прямо в ваш сервис или на стоянку.',
    date: '18.11.2025',
  },
  {
    id: 3,
    image: '/news-3.png',
    title: 'Теперь доставка в день заказа!',
    text: 'Для клиентов из Челябинска и области — экспресс-доставка автозапчастей прямо в сервис или на стоянку.',
    date: '12.11.2025',
  },
  {
    id: 4,
    image: '/news-4.png',
    title: 'Новая поставка оригинальных запчастей',
    text: 'Мы обновили склад — в наличии новые позиции. Быстрая отгрузка и гарантия качества на все детали.',
    date: '11.11.2025',
  },
]

export default function News() {
  const [current, setCurrent] = useState(0)

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1))
  }

  const currentItem = newsItems[current]

  return (
    <section className="max-w-[1442px] mx-auto pt-[40px] pb-[126px] px-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[#0B0D0D] text-2xl font-medium">Новости</h2>

        <div className="flex items-center gap-2">
          <button type="button" onClick={handlePrev} className="p-1 hover:opacity-70 transition" aria-label="Предыдущая новость">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="h-[34px] w-[1px] bg-[#313131]" />

          <button type="button" onClick={handleNext} className="p-1 hover:opacity-70 transition" aria-label="Следующая новость">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="hidden md:flex gap-6">
        {newsItems.map((item) => (
          <article key={item.id} className="flex flex-col bg-[#F3F3F3] rounded-[20px] overflow-hidden max-w-[300px] flex-1">
            <div className="h-[180px] w-full overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>

            <div className="px-6 py-5">
              <h3 className="text-[#313131] text-[16px] font-medium leading-5 mb-3">{item.title}</h3>
              <p className="text-[#707070] text-[14px] leading-[20px] mb-3">{item.text}</p>
              <p className="text-[12px] text-[#9B9B9B]">{item.date}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="md:hidden">
        <article className="mx-auto flex flex-col bg-[#F3F3F3] rounded-[20px] overflow-hidden max-w-[320px]">
          <div className="h-[180px] w-full overflow-hidden">
            <img src={currentItem.image} alt={currentItem.title} className="w-full h-full object-cover" />
          </div>

          <div className="px-5 py-4">
            <h3 className="text-[#313131] text-[16px] font-medium leading-5 mb-3">{currentItem.title}</h3>
            <p className="text-[#707070] text-[14px] leading-[20px] mb-3">{currentItem.text}</p>
            <p className="text-[12px] text-[#9B9B9B]">{currentItem.date}</p>
          </div>
        </article>
      </div>
    </section>
  )
}
