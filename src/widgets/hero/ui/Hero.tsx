import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

//@ts-ignore
import 'swiper/css'
//@ts-ignore
import 'swiper/css/pagination'
import { features, heroSlides } from '../config'

export default function Hero() {
  const [current, setCurrent] = useState(0)

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? features.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === features.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <section className="relative w-full h-[702px] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="w-full h-full"
            style={
              {
                '--swiper-pagination-color': '#F7F7F7',
                '--swiper-pagination-bullet-inactive-color': '#F7F7F7',
                '--swiper-pagination-bullet-inactive-opacity': '0.45',
                '--swiper-pagination-bullet-size': '8px',
                '--swiper-pagination-bullet-horizontal-gap': '6px',
              } as React.CSSProperties
            }
          >
            {heroSlides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${slide.image}')` }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className="
    relative z-10 max-w-[1442px] mx-auto h-full flex flex-col justify-center pointer-events-none
    px-[clamp(16px,4vw,40px)] py-[clamp(48px,8vw,80px)]
    items-center text-center
    md:items-start md:text-left
  "
        >
          <h1 className="font-bold leading-tight max-w-[clamp(320px,60vw,768px)] text-[clamp(28px,5vw,60px)]">
            Запчасти для коммерческой техники <br className="hidden sm:block" /> и спецтехники
          </h1>

          <p className="mt-[clamp(12px,2vw,24px)] max-w-[clamp(320px,60vw,672px)] text-[clamp(14px,2vw,18px)] leading-[1.6] text-gray-200">
            Ваш транспорт — это инструмент, который должен работать, а не стоять в ремонте. Мы помогаем механикам, автопаркам и сервисным центрам
            держать технику в строю, поставляя качественные запчасти для грузовиков, автобусов, спецтехники и прицепов — точно в срок и по лучшей
            цене.
          </p>

          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <button className="pointer-events-auto mt-[clamp(30px,3vw,40px)] bg-[#0075B1] hover:bg-[#2d5a70] transition text-white px-[clamp(20px,4vw,48px)] py-[clamp(10px,1.5vw,12px)] rounded-[6px] text-[clamp(14px,2vw,18px)] font-medium">
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      <div className="hidden md:flex items-start justify-center gap-8 bg-[#E1E1E1]/50 py-5 mb-[58px] flex-wrap">
        {features.map((f, i) => (
          <div key={f.title} className="flex items-start gap-8">
            <div className="max-w-[179px]">
              <h3 className="text-[14px] text-[#313131]">{f.title}</h3>
              <p className="text-sm mt-2 text-[#707070]">{f.text}</p>
            </div>
            {i !== features.length - 1 && <div className="h-16 w-[1px] mt-4 rounded-2xl bg-[#313131]" />}
          </div>
        ))}
      </div>

      <div className="md:hidden bg-[#E1E1E1]/50 py-5 mb-[58px]">
        <div className="mx-auto max-w-[480px] w-full px-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="flex-none p-2 rounded-full hover:bg-black/5 active:scale-95 transition"
              aria-label="Предыдущий пункт"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>

            <div className="flex-1 min-w-0">
              <div className="overflow-hidden w-full">
                <div className="flex w-full transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                  {features.map((f) => (
                    <div key={f.title} className="w-full flex-shrink-0 text-center px-2">
                      <div className="mx-auto max-w-[28ch] break-words">
                        <h3 className="text-base text-[#313131] mb-3 font-medium break-words">{f.title}</h3>
                        <p className="text-sm text-[#707070] break-words">{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 w-2 rounded-full transition ${i === current ? 'bg-[#0075B1]' : 'bg-[#C4C4C4]'}`}
                    aria-label={`Перейти к слайду ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="flex-none p-2 rounded-full hover:bg-black/5 active:scale-95 transition"
              aria-label="Следующий пункт"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
