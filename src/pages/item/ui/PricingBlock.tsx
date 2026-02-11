type Props = {
	title: string
	rating: number
	stock: number
	price: number
	oldPrice?: number | null
	discount?: number | null
	onAddToCart?: () => void
	onBuyNow?: () => void
}

export function PricingBlock({ title, rating, stock, price, oldPrice, discount, onAddToCart, onBuyNow }: Props) {
	const inStock = stock > 0
	return (
		<section className="w-[565px]">
			<div className="flex items-center gap-3 text-lg text-[#7f7f7f]">
				<Stars value={rating} />
				<span aria-hidden>•</span>
				{inStock ? <span>В наличии {stock} шт.</span> : <span className="text-[#c00]">Нет в наличии</span>}
			</div>

			<h1 className="mt-6 text-4xl font-medium text-[#141414]">{title}</h1>

			<div className="mt-8 w-[448px]">
				<div className="flex flex-col items-end gap-4">
					{typeof discount === 'number' && discount > 0 ? (
						<div className="inline-flex items-center justify-center gap-2.5 px-2 py-1 bg-[#ededed] rounded text-base text-[#7f7f7f]">
							-{discount}%
						</div>
					) : null}

					<div className="flex items-center gap-3">
						<div className="text-4xl font-medium text-[#141414]">{fmt(price)}</div>
						{oldPrice ? <div className="text-4xl text-[#7f7f7f] line-through">{fmt(oldPrice)}</div> : null}
					</div>
				</div>

				<div className="mt-6 flex gap-6">
					<button
						type="button"
						className="inline-flex w-[212px] justify-center px-4 py-4 rounded bg-[#141414] text-white hover:bg-[#2a2a2a] transition-colors disabled:bg-[#a5a5a5] disabled:text-white/80"
						onClick={onAddToCart}
						aria-label="Добавить товар в корзину"
						disabled={!inStock}
					>
						В корзину
					</button>
					<button
						type="button"
						className="inline-flex w-[212px] justify-center px-4 py-4 rounded bg-[#ededed] text-[#141414] hover:bg-[#d4d4d4] transition-colors disabled:bg-[#f3f3f3] disabled:text-[#9f9f9f]"
						onClick={onBuyNow}
						aria-label="Купить товар сейчас"
						disabled={!inStock}
					>
						Купить сейчас
					</button>
				</div>
			</div>
		</section>
	)
}

function fmt(n?: number | null) {
	return typeof n === 'number' ? n.toLocaleString('ru-RU') + '₽' : ''
}

function Stars({ value }: { value: number }) {
	const r = Math.round(value)
	return (
		<span className="inline-flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden>
					<path
						d="M12 2l3.09 6.26L22 9.27l-5 4.88L18.18 22 12 18.56 5.82 22 7 14.15l-5-4.88 6-1.01L12 2z"
						fill={i + 1 <= r ? '#141414' : '#E5E7EB'}
					/>
				</svg>
			))}
		</span>
	)
}
