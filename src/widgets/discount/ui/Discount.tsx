import { ArrowRight } from 'lucide-react'

function MoreLink({ href = '#', variant = 'primary' }: { href?: string; variant?: 'primary' | 'white' }) {
  const cls = variant === 'white' ? 'text-white/90 hover:text-white' : 'text-[#0075B1] hover:text-[#00639A]'

  return (
    <a href={href} className={`inline-flex items-center gap-2 text-sm font-medium transition ${cls}`}>
      Подробнее <ArrowRight className="w-4 h-4" />
    </a>
  )
}

export default function Discount() {
  return (
    <div className="max-w-[1442px] mx-auto mb-10 px-4 sm:px-6 lg:px-10">
      <h2 className="mb-6 text-[#0B0D0D] text-xl sm:text-2xl leading-8 sm:leading-10 font-medium">Акции и скидки</h2>

      <div className="flex flex-wrap gap-2.5 items-stretch">
        <div className="flex flex-col p-4 sm:p-6 lg:p-7.5 bg-[#F1F1F1] h-auto md:h-[380px] flex-1 min-w-[280px]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-7.5">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[#707070] text-[14px]">Новинка 2025</h3>
              <p className="text-[#313131] font-semibold text-lg sm:text-2xl leading-snug sm:leading-[26px]">
                Мега скидка 30% на все <br className="hidden sm:block" /> фильтры
              </p>
            </div>

            <p className="text-[#0075B1] font-medium leading-none whitespace-nowrap text-[clamp(32px,6vw,96px)]">-30%</p>
          </div>

          <div className="mt-auto pt-6">
            <MoreLink href="#" />
          </div>
        </div>

        <div className="flex flex-col p-4 sm:p-6 lg:p-7.5 bg-[#F1F1F1] h-auto md:h-[380px] flex-1 min-w-[220px]">
          <div className="flex flex-col gap-7.5 items-start">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[#707070] text-[14px]">Мега скидки</h3>
              <p className="text-[#313131] font-semibold text-lg sm:text-2xl leading-snug">Бесплатная доставка при заказе от 10 000 ₽</p>
            </div>

            <img className="max-w-full h-auto" src="/settings.png" alt="картинка" />
          </div>

          <div className="mt-auto pt-6">
            <MoreLink href="#" />
          </div>
        </div>

        <div className="flex-1 min-w-[220px] h-auto md:h-[380px]">
          <div className="flex flex-col gap-2.5 h-full">
            <div className="bg-[#0075B1] p-4 sm:p-6 lg:p-7.5 relative overflow-hidden h-auto md:h-[185px]">
              <div className="flex flex-col h-full">
                <div className="flex flex-col gap-2.5 max-w-[220px] sm:max-w-[163px]">
                  <h3 className="text-[#F7F7F7] text-[14px]">Мега скидки</h3>
                  <p className="text-white font-semibold text-lg sm:text-2xl leading-snug">Сезонное ТО со скидкой</p>
                </div>

                <div className="mt-auto pt-5">
                  <MoreLink href="#" variant="white" />
                </div>
              </div>

              <img className="absolute bottom-0 right-4 sm:right-10 w-28 sm:w-36 md:w-44 h-auto" src="/shina.png" alt="shina" />
            </div>

            <div className="bg-[#F1F1F1] p-4 sm:p-6 lg:p-7.5 flex justify-between items-end gap-4 h-auto md:h-[185px]">
              <MoreLink href="#" />

              <div className="max-w-[220px] sm:max-w-[160px] text-right">
                <h3 className="text-[#707070] text-[14px]">Новинка 2025</h3>
                <p className="text-[#313131] font-semibold text-lg sm:text-2xl leading-snug">Второй товар — со скидкой 50%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
