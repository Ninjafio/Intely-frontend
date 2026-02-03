import { APP_PATHS } from '@shared/config'
import { Logo } from '@shared/ui'
import { Menu, SearchIcon, X } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router'
import { linkMap, PHONE_NUMBER } from '../config'
import type { ICatalogFilters } from '@pages/catalog/model'

export default function Header() {
  const sidSearch = useId()

  const INITIAL_FILTERS: ICatalogFilters = {
    q: '',
    groups: [],
    priceFrom: undefined,
    priceTo: undefined,
  }

  const [filters, setFilters] = useState<ICatalogFilters>(INITIAL_FILTERS)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSearchChange = (searchValue: string) => {
    setFilters((prev) => ({ ...prev, q: searchValue }))
  }

  return (
    <header className="flex flex-col bg-white mb-3 max-w-[1442px] mx-auto relative px-10">
      <div className="hidden md:flex justify-between items-center py-2 px-4 border-b border-gray-200">
        <p className="text-grey-normal text-sm">Ваш город: Челябинск</p>

        <nav className="flex space-x-6">
          {linkMap.map((link) => (
            <Link key={link.href} className="text-grey-medium text-sm transition-colors hover:text-[#006598]" to={link.href}>
              {link.text}
            </Link>
          ))}
        </nav>

        <Link to="#" className="text-grey-medium text-sm transition-colors">
          {PHONE_NUMBER}
        </Link>
      </div>

      <div className="hidden md:flex items-center py-4 px-8 flex-wrap">
        <Logo />

        <div className="flex items-center gap-4 flex-1 max-w-3xl ml-20">
          <Link
            to={APP_PATHS.CATALOG}
            className="bg-[#0075B1] transition-colors duration-150 hover:bg-[#2d7da5] rounded-[6px] px-4 py-3 text-white flex items-center gap-2 whitespace-nowrap"
          >
            <Menu className="w-5 h-5" />
            Каталог
          </Link>

          <div className="flex-1">
            <div id={sidSearch}>
              <label className="relative block">
                <span className="sr-only">Поиск</span>
                <input
                  type="search"
                  className="w-full h-[48px] rounded-lg bg-[#F1F1F1] pl-12 pr-4 text-base text-[#141414] placeholder-[#929292] border border-transparent focus:border-[#0075B1] focus:outline-none"
                  placeholder="Поиск"
                  value={filters.q || ''}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <SearchIcon className="w-5 h-5 text-[#929292]" />
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200 md:hidden">
        <Logo />
        <button type="button" className="p-2" onClick={() => setIsMobileMenuOpen(true)} aria-label="Открыть меню">
          <Menu className="w-7 h-7 text-[#4b4b4b]" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Закрыть меню"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-[80%] max-w-[360px] bg-white shadow-xl md:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <span className="text-sm text-grey-normal">Ваш город: Челябинск</span>
          <button type="button" className="p-1" onClick={() => setIsMobileMenuOpen(false)} aria-label="Закрыть меню">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-4 py-4">
          <Link
            to={APP_PATHS.CATALOG}
            className="bg-[#0075B1] transition-colors duration-150 hover:bg-[#2d7da5] rounded-[6px] px-4 py-3 text-white flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Menu className="w-5 h-5" />
            Каталог
          </Link>

          <div id={`${sidSearch}-mobile`}>
            <label className="relative block">
              <span className="sr-only">Поиск</span>
              <input
                type="search"
                className="w-full h-[48px] rounded-lg bg-[#F1F1F1] pl-12 pr-4 text-base text-[#141414] placeholder-[#929292] border border-transparent focus:border-[#0075B1] focus:outline-none"
                placeholder="Поиск"
                value={filters.q || ''}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                <SearchIcon className="w-5 h-5 text-[#929292]" />
              </span>
            </label>
          </div>

          <nav className="flex flex-col gap-3 mt-2">
            {linkMap.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-grey-medium text-base transition-colors hover:text-[#006598]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          <Link
            to="#"
            className="mt-4 text-lg font-medium text-grey-medium transition-colors hover:text-[#006598]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {PHONE_NUMBER}
          </Link>
        </div>
      </div>
    </header>
  )
}
