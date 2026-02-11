import type { CartItem } from '@store/cart'
import { removeFromCart, toggleSelect, updateQty } from '@store/cart'
import { useMemo } from 'react'

type Props = {
	item: CartItem
}

export function CartItemCard({ item }: Props) {
	const handleQty = (delta: number) => {
		const next = item.qty + delta
		if (next < 1) return
		updateQty({ id: item.id, qty: next })
	}

	const priceNow = useMemo(() => item.price * item.qty, [item.price, item.qty])
	const priceOld = useMemo(() => (item.oldPrice ?? item.price) * item.qty, [item.oldPrice, item.price, item.qty])

	return (
		<article className="cart-item">
			<div className="cart-item__check">
				<input type="checkbox" checked={item.selected} onChange={() => toggleSelect(item.id)} aria-label="Выбрать товар" />
			</div>

			<div className="thumb" aria-hidden="true">
				{item.imageUrl ? (
					<img src={item.imageUrl} alt="" />
				) : (
					<span>
						IMG
						<br />
						68×68
					</span>
				)}
			</div>

			<div className="meta">
				<p className="meta__title">{item.title}</p>
				<div className="meta__sub">
					{item.brand && <div>{item.brand}</div>}
					{item.article && <div>{item.article}</div>}
				</div>

				<div className="cart-item__controls" aria-hidden="true">
					<div className="qty" aria-label="Количество">
						<button type="button" aria-label="Уменьшить" onClick={() => handleQty(-1)}>
							−
						</button>
						<input
							value={item.qty}
							onChange={(e) => {
								const v = Number(e.target.value) || 1
								updateQty({ id: item.id, qty: v })
							}}
							aria-label="Количество"
						/>
						<button type="button" aria-label="Увеличить" onClick={() => handleQty(1)}>
							+
						</button>
					</div>
					{/*<div className="price" aria-label="Цена">
						<span className="price__now">{priceNow.toLocaleString('ru-RU')} ₽</span>
						{priceOld > priceNow && <span className="price__old">{priceOld.toLocaleString('ru-RU')} ₽</span>}
					</div>*/}
				</div>
			</div>

			{/*<div className="qty" aria-label="Количество">
				<button type="button" aria-label="Уменьшить" onClick={() => handleQty(-1)}>
					−
				</button>
				<input
					value={item.qty}
					onChange={(e) => {
						const v = Number(e.target.value) || 1
						updateQty({ id: item.id, qty: v })
					}}
					aria-label="Количество"
				/>
				<button type="button" aria-label="Увеличить" onClick={() => handleQty(1)}>
					+
				</button>
			</div>
*/}

			<div className="right-wrapper">
				<div className="price" aria-label="Цена">
					<span className="price__now">{priceNow.toLocaleString('ru-RU')} ₽</span>
					{priceOld > priceNow && <span className="price__old">{priceOld.toLocaleString('ru-RU')} ₽</span>}
				</div>

				<button className="remove" type="button" aria-label="Удалить" onClick={() => removeFromCart(item.id)}>
					<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
						<path
							d="M7.2 6.8h5.6m-7.2 0h8.8m-7.9 0 .7-1.6h4.9l.7 1.6M7.4 6.8l.6 10h4l.6-10"
							stroke="currentColor"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
		</article>
	)
}
