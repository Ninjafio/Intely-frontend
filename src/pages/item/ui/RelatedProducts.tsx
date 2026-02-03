import type { ProductListItem } from '@pages/item/api/types' //
import { APP_PATHS } from '@shared/config'
import { Link } from 'react-router-dom'

const IconArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)
const IconArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const RelatedProducts = ({ products }: { products: ProductListItem[] }) => {
  if (!products?.length) return null

  return (
    <section className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
      <header className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
        <h2 className="w-fit mt-[-1.00px] font-title-XS-medium font-[number:var(--title-XS-medium-font-weight)] text-accentgeneral text-[length:var(--title-XS-medium-font-size)] leading-[var(--title-XS-medium-line-height)] whitespace-nowrap relative tracking-[var(--title-XS-medium-letter-spacing)] [font-style:var(--title-XS-medium-font-style)]">
          С этим товаром часто покупают
        </h2>

        <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
          <button type="button" aria-label="Previous products" className="text-grey-500">
            <IconArrowLeft />
          </button>
          <div className="relative w-px h-4 bg-grey-300" />
          <button type="button" aria-label="Next products" className="text-grey-500">
            <IconArrowRight />
          </button>
        </div>
      </header>

      <div className="w-full overflow-x-auto pb-4">
        <div className="flex w-max items-start gap-5 relative">
          {products.map((product) => (
            <article key={product.id} className="flex flex-col w-[250px] items-start gap-3 relative">
              <Link to={`${APP_PATHS.ITEM}/${product.id}`} className="block w-full">
                <div
                  className="relative self-stretch w-full h-[252px] rounded-[10px] bg-cover bg-center bg-no-repeat bg-gray-100"
                  style={{ backgroundImage: `url(${product.imageUrl!})` }}
                />
              </Link>

              <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <h3 className="relative self-stretch h-[38px] mt-[-1.00px] font-body-s-regular font-[number:var(--body-s-regular-font-weight)] text-grey-600 text-[length:var(--body-s-regular-font-size)] tracking-[var(--body-s-regular-letter-spacing)] leading-[var(--body-s-regular-line-height)] [font-style:var(--body-s-regular-font-style)]">
                    <Link to={`${APP_PATHS.ITEM}/${product.id}`} className="block truncate hover:text-accentblue">
                      {product.title}
                    </Link>
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
                  <span className="w-fit  mt-[-1.00px] font-body-m-regular font-[number:var(--body-m-regular-font-weight)] text-grey-600 text-[length:var(--body-m-regular-font-size)] leading-[var(--body-m-regular-line-height)] whitespace-nowrap relative tracking-[var(--body-m-regular-letter-spacing)] [font-style:var(--body-m-regular-font-style)]">
                    {product.price} ₽
                  </span>
                  {product.oldPrice && (
                    <span className="relative w-fit font-body-XS-regular font-[number:var(--body-XS-regular-font-weight)] text-grey-500 text-[length:var(--body-XS-regular-font-size)] tracking-[var(--body-XS-regular-letter-spacing)] leading-[var(--body-XS-regular-line-height)] line-through whitespace-nowrap [font-style:var(--body-XS-regular-font-style)]">
                      {product.oldPrice} ₽
                    </span>
                  )}
                </div>
              </div>

              <button type="button" className="inline-flex gap-2 px-3 py-2 flex-[0_0_auto] bg-accentblue rounded-md relative items-center">
                <span className="flex justify-center w-fit mt-[-1.00px] font-body-s-regular font-[number:var(--body-s-regular-font-weight)] text-white text-[length:var(--body-s-regular-font-size)] tracking-[var(--body-s-regular-letter-spacing)] leading-[var(--body-s-regular-line-height)] whitespace-nowrap relative items-center [font-style:var(--body-s-regular-font-style)]">
                  Купить
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
