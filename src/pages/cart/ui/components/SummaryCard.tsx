import type { CartTotals } from '@store/cart'
import { clearCart } from '@store/cart'

type Props = {
	totals: CartTotals
	onCheckout: () => void
}

export function SummaryCard({ totals, onCheckout }: Props) {
	return (
		<aside className="card summary" aria-label="Сводка заказа">
			<h3 className="summary__title">Заказ на {totals.total.toLocaleString('ru-RU')} ₽</h3>

			<div className="summary__rows">
				<div className="row">
					<span>Товары, {totals.count} шт.</span>
					<span>{totals.oldTotal.toLocaleString('ru-RU')} ₽</span>
				</div>
				<div className="row">
					<span>Скидка</span>
					<span>− {totals.discount.toLocaleString('ru-RU')} ₽</span>
				</div>
				<div className="row">
					<span>Доставка</span>
					<span className="free">Бесплатно</span>
				</div>
			</div>

			<div className="summary__total">
				<span style={{ fontWeight: 600 }}>Итого</span>
				<b>{totals.total.toLocaleString('ru-RU')} ₽</b>
			</div>

			<button className="pay-btn" type="button" onClick={onCheckout}>
				Перейти к оплате
			</button>

			<label className="agree">
				<input type="checkbox" defaultChecked />
				<span>Соглашаюсь с правилами пользования торговой площадкой и возврата</span>
			</label>

			{/*<button className="pay-btn" style={{ marginTop: 12, background: '#e11d48' }} onClick={() => clearCart()}>
				Очистить корзину
			</button>*/}
		</aside>
	)
}
