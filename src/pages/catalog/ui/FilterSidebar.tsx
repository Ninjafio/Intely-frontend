import { useEffect, useId, useState } from 'react'
import { CATEGORIES } from '../config'
import type { IFilterSidebarProps } from '../model'
import { PriceRangeBarFeature } from '@features/price-range-bar'
import './css/FilterSidebar.css'

export function FilterSidebar({ value, onChange, onReset }: IFilterSidebarProps) {
  const [openSearch, setOpenSearch] = useState(true)
  const [openCategories, setOpenCategories] = useState(true)
  const [openPrice, setOpenPrice] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    if (isOpenModal) {
      document.body.classList.add('overflow-y-hidden')
    } else {
      document.body.classList.remove('overflow-y-hidden')
    }
  }, [isOpenModal])
  
  const sidSearch = useId()
  const sidCategories = useId()
  const sidPrice = useId()

  const toggle = (arr: string[] | undefined, item: string) => {
    const set = new Set(arr ?? [])
    set.has(item) ? set.delete(item) : set.add(item)
    return Array.from(set)
  }

  return (
    <>
      <div className="sidebar-container_mini">
        <h1 className="sidebar-title">Каталог товаров</h1>

        <div className="flex__wrapper">
          {openSearch && (
            <div id={sidSearch} className="search-box">
              <label className="search-wrapper">
                <span className="sr-only">Поиск</span>
                <input
                  type="search"
                  className="sidebar-input search-input"
                  placeholder="Поиск"
                  value={value.q ?? ''}
                  onChange={(e) => onChange({ ...value, q: e.target.value })}
                />
                <span className="search-icon-pos">
                  <SearchIcon />
                </span>
              </label>
            </div>
          )}
          <button className="open-filters__btn" onClick={() => setIsOpenModal(true)} />
        </div>
      </div>
      <div className="sidebar-container_modal" style={{ display: `${isOpenModal ? 'block' : 'none'}` }}>
        <div className="flex__modal">
          <h1 className="sidebar-title">Фильтры</h1>
          <button className="close__modal" onClick={() => setIsOpenModal(false)}></button>
        </div>

        <section className="sidebar-section-large">
          <button className="accordion-trigger" aria-expanded={openPrice} aria-controls={sidPrice} onClick={() => setOpenPrice((v) => !v)}>
            Цена
            <Chevron open={openPrice} />
          </button>

          {openPrice && (
            <div id={sidPrice} className="price-box">
              <PriceRangeBarFeature
                min={0}
                max={20000}
                valueMin={value.priceFrom}
                valueMax={value.priceTo}
                onChange={(from, to) => onChange({ ...value, priceFrom: from, priceTo: to })}
              />

              <div className="price-inputs-row">
                <div className="input_wrapper">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="От"
                    className="sidebar-input input-half"
                    value={value.priceFrom ?? ''}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        priceFrom: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
                <div className="input_wrapper">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="До"
                    className="sidebar-input input-half"
                    value={value.priceTo ?? ''}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        priceTo: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="sidebar-section">
          <button className="accordion-trigger" aria-expanded={openSearch} aria-controls={sidSearch} onClick={() => setOpenSearch((v) => !v)}>
            Поиск с полем ввода
            <Chevron open={openSearch} />
          </button>

          {openSearch && (
            <div id={sidSearch} className="search-box">
              <label className="search-wrapper">
                <span className="sr-only">Поиск</span>
                <input
                  type="search"
                  className="sidebar-input search-input"
                  placeholder="Поиск"
                  value={value.q ?? ''}
                  onChange={(e) => onChange({ ...value, q: e.target.value })}
                />
                <span className="search-icon-pos">
                  <SearchIcon />
                </span>
              </label>
            </div>
          )}
        </section>

        <section className="sidebar-section">
          <button
            className="accordion-trigger"
            aria-expanded={openCategories}
            aria-controls={sidCategories}
            onClick={() => setOpenCategories((v) => !v)}
          >
            Категории
            <Chevron open={openCategories} />
          </button>

          {openCategories && (
            <div id={sidCategories} className="categories-scroll-list">
              {CATEGORIES.map((label) => (
                <label key={label} className="checkbox-item">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={value.groups?.includes(label) ?? false}
                    onChange={() => onChange({ ...value, groups: toggle(value.groups, label) })}
                  />
                  <span className="checkbox-text">{label}</span>
                </label>
              ))}
            </div>
          )}
        </section>

        <button type="button" onClick={onReset} className="reset-filters-btn">
          Очистить фильтры
        </button>
      </div>
      <aside className="sidebar-container">
        <p>Главная / Каталог товаров</p>
        <h1 className="sidebar-title">Каталог товаров</h1>

        <section className="sidebar-section-large">
          <button className="accordion-trigger" aria-expanded={openPrice} aria-controls={sidPrice} onClick={() => setOpenPrice((v) => !v)}>
            Цена
            <Chevron open={openPrice} />
          </button>

          {openPrice && (
            <div id={sidPrice} className="price-box">
              <PriceRangeBarFeature
                min={0}
                max={20000}
                valueMin={value.priceFrom}
                valueMax={value.priceTo}
                onChange={(from, to) => onChange({ ...value, priceFrom: from, priceTo: to })}
              />

              <div className="price-inputs-row">
                <div className="input_wrapper">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="От"
                    className="sidebar-input input-half"
                    value={value.priceFrom ?? ''}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        priceFrom: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
                <div className="input_wrapper">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="До"
                    className="sidebar-input input-half"
                    value={value.priceTo ?? ''}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        priceTo: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="sidebar-section">
          <button className="accordion-trigger" aria-expanded={openSearch} aria-controls={sidSearch} onClick={() => setOpenSearch((v) => !v)}>
            Поиск с полем ввода
            <Chevron open={openSearch} />
          </button>

          {openSearch && (
            <div id={sidSearch} className="search-box">
              <label className="search-wrapper">
                <span className="sr-only">Поиск</span>
                <input
                  type="search"
                  className="sidebar-input search-input"
                  placeholder="Поиск"
                  value={value.q ?? ''}
                  onChange={(e) => onChange({ ...value, q: e.target.value })}
                />
                <span className="search-icon-pos">
                  <SearchIcon />
                </span>
              </label>
            </div>
          )}
        </section>

        <section className="sidebar-section">
          <button
            className="accordion-trigger"
            aria-expanded={openCategories}
            aria-controls={sidCategories}
            onClick={() => setOpenCategories((v) => !v)}
          >
            Категории
            <Chevron open={openCategories} />
          </button>

          {openCategories && (
            <div id={sidCategories} className="categories-scroll-list">
              {CATEGORIES.map((label) => (
                <label key={label} className="checkbox-item">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={value.groups?.includes(label) ?? false}
                    onChange={() => onChange({ ...value, groups: toggle(value.groups, label) })}
                  />
                  <span className="checkbox-text">{label}</span>
                </label>
              ))}
            </div>
          )}
        </section>

        <button type="button" onClick={onReset} className="reset-filters-btn">
          Очистить фильтры
        </button>
      </aside>
    </>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`chevron-svg ${open ? 'rotated' : ''}`} viewBox="0 0 16 9" fill="none" aria-hidden>
      <path d="M1 1l7 7 7-7" stroke="#141414" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="#7f7f7f" strokeWidth="2" />
      <path d="M20 20l-3.2-3.2" stroke="#7f7f7f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
