import { Link } from 'react-router-dom'
import { renderPrice } from '../lib'
import type { ProductGridProps } from '../model'
import './css/ProductGrid.css'

const NO_IMAGE = '/no-image.png'

export function ProductGrid({ products, loading, onBuy }: ProductGridProps) {
  if (loading) {
    return (
      <section className="product-grid-loading">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-text skeleton-title-short" />
            <div className="skeleton-text skeleton-title-full" />
            <div className="skeleton-text skeleton-subtitle" />
            <div className="skeleton-text skeleton-button" />
          </div>
        ))}
      </section>
    )
  }

  if (!products.length) {
    return <p className="no-results">Нет результатов по текущим фильтрам.</p>
  }

  return (
    <section className="product-grid">
      {products.map((p) => {
        const imageSrc = p.imageUrl || NO_IMAGE

        return (
          <div className="product-card_wrapper">
            <article key={p.id} className="product-card">
              <Link to={`/item/${p.id}`} aria-label={p.title} className="product-link">
                <div className="product-image-wrapper">
                  <img src={imageSrc} className="product-image" alt={p.title || 'Нет изображения'} />
                </div>
              </Link>

              <h3 className="product-title">{p.title}</h3>

              <div className="product-footer">
                <div className="product-info">
                  <div className="product-prices">
                    <span className="current-price">{renderPrice(p.price)}</span>
                    {p.oldPrice ? <span className="old-price">{renderPrice(p.oldPrice)}</span> : null}
                  </div>

                  <div className="product-actions">
                    <button type="button" className="buy-button" aria-label="Заказать товар" onClick={() => onBuy?.(p)}>
                      Купить
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )
      })}
    </section>
  )
}
