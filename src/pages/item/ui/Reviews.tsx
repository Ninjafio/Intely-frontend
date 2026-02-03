import type { Review } from '../api/types'

export function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) return null

  return (
    <section className="mt-24 max-w-[1156px]">
      <h2 className="text-4xl font-semibold text-[#141414]">Отзывы</h2>

      <div className="mt-12 flex flex-wrap justify-between gap-[48px_24px]">
        {reviews.map((r) => (
          <article key={r.id} className="flex w-[566px] gap-6">
            <div className="w-16 h-16 rounded bg-[#ededed]" aria-hidden />
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-6">
                <h3 className="text-lg font-medium text-[#141414]">{r.author}</h3>
                <ReviewStars rating={r.rating} />
              </div>
              <p className="text-base text-[#141414]">{r.comment}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ReviewStars({ rating }: { rating: number }) {
  const r = Math.round(rating)
  return (
    <span className="inline-flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.88L18.18 22 12 18.56 5.82 22 7 14.15l-5-4.88 6-1.01L12 2z"
            fill={i + 1 <= r ? '#141414' : '#E5E7EB'}
          />
        </svg>
      ))}
    </span>
  )
}