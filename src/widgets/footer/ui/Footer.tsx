import { Logo, Mail, Telegram, VK } from '@shared/ui'
import { Link } from 'react-router'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white">
      <div className="max-w-[1442px] mx-auto px-10 md:px-[85px] pt-8 pb-[60px] flex flex-col gap-8">
        {/* верхняя часть: логотип + меню */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* левая колонка: логотип + соцсети */}
          <div className="flex flex-col gap-6">
            <Logo />

            <div className="flex items-center gap-2.5">
              <Link to="#">
                <VK />
              </Link>
              <Link to="#">
                <Mail />
              </Link>
              <Link to="#">
                <Telegram />
              </Link>
            </div>
          </div>

          {/* правая часть: 3 колонки ссылок */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-16">
            {/* Колонка 1: Покупателям */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-[#141414]">Покупателям</h3>
              <div className="flex flex-col gap-3 text-sm">
                <Link to="#" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  Акции
                </Link>
                <Link to="#" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  О компании
                </Link>
                <Link to="#" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  Доставка
                </Link>
                <Link to="#" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  Адреса
                </Link>
                <Link to="#" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  Контакты
                </Link>
              </div>
            </div>

            {/* Колонка 2: Информация */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-[#141414]">Информация</h3>
              <div className="flex flex-col gap-3 text-sm">
                <Link to="#" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  Реквизиты
                </Link>
                <Link to="#" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  Офферта
                </Link>
                <Link to="#" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  Политика конфиденциальности
                </Link>
              </div>
            </div>

            {/* Колонка 3: Контакты */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-[#141414]">Контакты</h3>
              <div className="flex flex-col gap-3 text-sm">
                <a href="tel:89000000000" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  8 (900) 000 00 00
                </a>
                <a href="mailto:email@gmail.com" className="text-[#141414] hover:text-[#0075B1] transition-colors">
                  email@gmail.com
                </a>
                <address className="text-[#141414] not-italic max-w-[220px]">г. Челябинск, ул. Разина, д. 3 офис 908/19</address>
              </div>
            </div>
          </div>
        </div>

        {/* нижняя строка – копирайт */}
        <p className="text-xs md:text-sm text-[#707070]">© ООО Интеллект-Авто {currentYear}</p>
      </div>
    </footer>
  )
}
