import { APP_PATHS } from '@shared/config'
import { Cart, Logo, Profile } from '@shared/ui'
import { Menu, SearchIcon, X } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router'
import { linkMap, PHONE_NUMBER } from '../config'
import type { ICatalogFilters } from '@pages/catalog/model'
import '../css/Header.css'

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
    <header className="header">
      {/* Desktop Top Bar */}
      <div className="header__top-bar">
        <p className="header__city">Ваш город: Челябинск</p>

        <nav className="header__nav">
          {linkMap.map((link) => (
            <Link key={link.href} className="header__nav-link" to={link.href}>
              {link.text}
            </Link>
          ))}
        </nav>

        <Link to="#" className="header__phone">
          {PHONE_NUMBER}
        </Link>
      </div>

      {/* Desktop Main Header */}
      <div className="header__main">
        <Logo />

        <div className="header__actions">
          <Link to={APP_PATHS.CATALOG} className="header__catalog-btn">
            <Menu className="header__icon" />
            Каталог
          </Link>

          <div className="header__search-wrapper">
            <div id={sidSearch}>
              <label className="header__search-label">
                <span className="header__sr-only">Поиск</span>
                <input
                  type="search"
                  className="header__search-input"
                  placeholder="Поиск"
                  value={filters.q || ''}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <span className="header__search-icon-container">
                  <SearchIcon className="header__search-icon" />
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="header__btns">
          <Cart />
          <Profile />
        </div>
      </div>

      {/* Mobile Header Bar */}
      <div className="header__mobile-bar">
        <Logo />
        <button 
          type="button" 
          className="header__mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(true)} 
          aria-label="Открыть меню"
        >
          <Menu className="header__mobile-menu-icon" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Закрыть меню"
          className="header__mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Side Menu */}
      <div className={`header__mobile-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <div className="header__drawer-top">
          <span className="header__city">Ваш город: Челябинск</span>
          <button 
            type="button" 
            className="header__drawer-close" 
            onClick={() => setIsMobileMenuOpen(false)} 
            aria-label="Закрыть меню"
          >
            <X className="header__drawer-close-icon" />
          </button>
        </div>

        <div className="header__drawer-content">
          <Link
            to={APP_PATHS.CATALOG}
            className="header__catalog-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Menu className="header__icon" />
            Каталог
          </Link>

          <div id={`${sidSearch}-mobile`}>
            <label className="header__search-label">
              <span className="header__sr-only">Поиск</span>
              <input
                type="search"
                className="header__search-input"
                placeholder="Поиск"
                value={filters.q || ''}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <span className="header__search-icon-container">
                <SearchIcon className="header__search-icon" />
              </span>
            </label>
          </div>

          <nav className="header__mobile-nav">
            {linkMap.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="header__mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          <Link
            to="#"
            className="header__mobile-phone"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {PHONE_NUMBER}
          </Link>
        </div>
      </div>
    </header>
  )
}
