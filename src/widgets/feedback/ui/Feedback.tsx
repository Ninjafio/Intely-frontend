export default function Feedback() {
  return (
    <section className="relative w-full overflow-hidden rounded-xl mb-20">
      {/* фон с шинами */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/tires-bg.jpg")' }} />
      {/* затемнение */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-[1442px] mx-auto px-10 py-8 md:py-10 flex flex-col items-center text-white">
        {/* desktop-заголовок */}
        <h2 className="hidden md:block text-[26px] md:text-[30px] font-semibold mb-2 text-center">
          Работайте с техникой — работайте с профессионалами
        </h2>
        {/* mobile-заголовок */}
        <h2 className="md:hidden text-[20px] font-semibold mb-4 text-center">Подберем нужную запчасть за 5 минут</h2>

        {/* desktop-подзаголовок */}
        <p className="hidden md:block opacity-90 mb-8 max-w-3xl mx-auto text-sm md:text-base text-center">
          Оставьте заявку или позвоните нам — наши специалисты быстро подберут запчасти под ваш транспорт.
        </p>

        {/* DESKTOP: форма в линию */}
        <form className="hidden md:grid w-full grid-cols-[repeat(7,minmax(0,1fr))] gap-3">
          <select className="h-[48px] px-4 rounded-[6px] bg-white text-black border border-gray-300 w-full">
            <option>Услуги</option>
          </select>

          <select className="h-[48px] px-4 rounded-[6px] bg-white text-black border border-gray-300 w-full">
            <option>Марка</option>
          </select>

          <select className="h-[48px] px-4 rounded-[6px] bg-white text-black border border-gray-300 w-full">
            <option>Дата и время</option>
          </select>

          <select className="h-[48px] px-4 rounded-[6px] bg-white text-black border border-gray-300 w-full">
            <option>Филиал</option>
          </select>

          <input type="email" placeholder="E-mail" className="h-[48px] px-4 rounded-[6px] bg-white text-black border border-gray-300 w-full" />

          <input type="text" placeholder="Имя" className="h-[48px] px-4 rounded-[6px] bg-white text-black border border-gray-300 w-full" />

          <button type="button" className="h-[48px] bg-[#007BC1] text-white rounded-[6px] px-6 font-medium w-full hover:bg-[#0267a3] transition">
            Отправить
          </button>
        </form>

        {/* MOBILE: карточка со столбиком полей */}
        <form className="md:hidden w-full max-w-[340px] bg-black/40 rounded-xl px-4 pt-5 pb-6 space-y-3">
          <select className="h-[44px] px-3 rounded bg-white text-black border border-gray-300 w-full">
            <option>Услуги</option>
          </select>

          <select className="h-[44px] px-3 rounded bg-white text-black border border-gray-300 w-full">
            <option>Марка</option>
          </select>

          <select className="h-[44px] px-3 rounded bg-white text-black border border-gray-300 w-full">
            <option>Дата и время</option>
          </select>

          <select className="h-[44px] px-3 rounded bg-white text-black border border-gray-300 w-full">
            <option>Филиал</option>
          </select>

          <input type="email" placeholder="E-mail" className="h-[44px] px-3 rounded bg-white text-black border border-gray-300 w-full" />

          <input type="text" placeholder="Имя" className="h-[44px] px-3 rounded bg-white text-black border border-gray-300 w-full" />

          <button type="button" className="h-[44px] bg-[#007BC1] text-white rounded px-4 font-medium w-full hover:bg-[#0267a3] transition">
            Отправить
          </button>
        </form>
      </div>
    </section>
  )
}
