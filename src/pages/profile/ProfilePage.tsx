import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe, setCar, clearCar, type Me } from '@shared/api/user'
import { getMyOrders, type OrderRow } from '@shared/api/orders'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'

const carOptions = [
	{ id: 1, label: 'Toyota Camry 2020 (181 л.с.)' },
	{ id: 2, label: 'Toyota RAV4 2021 (203 л.с.)' },
	{ id: 3, label: 'BMW X5 2019 (340 л.с.)' },
	{ id: 4, label: 'BMW 3 Series 2020 (258 л.с.)' },
	{ id: 5, label: 'Lada Vesta 2022 (122 л.с.)' },
	{ id: 6, label: 'Lada Granta 2021 (98 л.с.)' },
]

export default function ProfilePage() {
	const nav = useNavigate()
	const [me, setMe] = useState<Me | null>(null)
	const [loading, setLoading] = useState(true)
	const [err, setErr] = useState<string | null>(null)
	const [selectedCar, setSelectedCar] = useState<number | ''>('')
	const [saving, setSaving] = useState(false)
	const [orders, setOrders] = useState<OrderRow[]>([])

	useEffect(() => {
		Promise.all([getMe(), getMyOrders()])
			.then(([u, o]) => {
				setMe(u)
				setOrders(o)
				if (u.car_model_id) setSelectedCar(u.car_model_id)
			})
			.catch((e) => {
				setErr(e?.message ?? 'Не удалось загрузить профиль')
				if (e?.message?.includes('токен')) nav('/')
			})
			.finally(() => setLoading(false))
	}, [nav])

	const handleSave = async () => {
		if (!selectedCar) return
		setSaving(true)
		setErr(null)
		try {
			await setCar(Number(selectedCar))
			const updated = await getMe()
			setMe(updated)
		} catch (e: any) {
			setErr(e?.message ?? 'Ошибка сохранения')
		} finally {
			setSaving(false)
		}
	}

	const handleClear = async () => {
		setSaving(true)
		setErr(null)
		try {
			await clearCar()
			const updated = await getMe()
			setMe(updated)
			setSelectedCar('')
		} catch (e: any) {
			setErr(e?.message ?? 'Ошибка удаления')
		} finally {
			setSaving(false)
		}
	}

	const renderOrders = () => {
		if (!orders.length) return <div className="text-sm text-gray-500">Заказов пока нет</div>
		return (
			<div className="overflow-auto">
				<table className="min-w-full text-sm text-gray-800 border border-gray-200 rounded-lg overflow-hidden">
					<thead className="bg-gray-50 text-left">
						<tr>
							<th className="px-3 py-2 border-b">№</th>
							<th className="px-3 py-2 border-b">Товар ID</th>
							<th className="px-3 py-2 border-b">Сумма</th>
							<th className="px-3 py-2 border-b">Статус</th>
							<th className="px-3 py-2 border-b">Дата</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((o) => (
							<tr key={o.id} className="odd:bg-white even:bg-gray-50">
								<td className="px-3 py-2 border-b">{o.id}</td>
								<td className="px-3 py-2 border-b">{o.main_good_id}</td>
								<td className="px-3 py-2 border-b">{o.price.toLocaleString('ru-RU')} ₽</td>
								<td className="px-3 py-2 border-b">{o.status === 'new' ? 'На рассмотрении' : o.status}</td>
								<td className="px-3 py-2 border-b">{o.date ? new Date(o.date).toLocaleString('ru-RU') : '—'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}

	if (loading) return <div className="p-6">Загрузка…</div>
	if (err) return <div className="p-6 text-red-500">{err}</div>
	if (!me) return <div className="p-6">Нет данных</div>

	return (
		<>
			<Header />
			<main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
				<h1 className="text-2xl font-semibold">Личный кабинет</h1>
				<h2 className="text-3xl font-bold">{[me.last_name, me.first_name, me.middle_name].filter(Boolean).join(' ')}</h2>

				<section className="rounded-xl border border-gray-200 p-5 shadow-sm bg-white space-y-2">
					<h2 className="text-lg font-medium">Профиль</h2>
					<div className="text-sm text-gray-700">Email: {me.email}</div>
					<div className="text-sm text-gray-700">Телефон: {me.phone}</div>
					{/*<div className="text-sm text-gray-700">Имя: {[me.last_name, me.first_name, me.middle_name].filter(Boolean).join(' ')}</div>*/}
				</section>

				<section className="rounded-xl border border-gray-200 p-5 shadow-sm bg-white space-y-2">
					<h2 className="text-lg font-medium">Финансы</h2>
					<div className="text-sm text-gray-700">Баланс: {me.balance ?? 0} ₽</div>
					<div className="text-sm text-gray-700">Кредит: {me.credit_limit ?? 0} ₽</div>
				</section>

				<section className="rounded-xl border border-gray-200 p-5 shadow-sm bg-white space-y-3">
					<h2 className="text-lg font-medium">Закреплённая машина</h2>
					<div className="text-sm text-gray-700">Текущая: {me.car_model ?? 'не выбрана'}</div>
					<select
						className="w-full border rounded-lg px-3 py-2 text-sm"
						value={selectedCar}
						onChange={(e) => setSelectedCar(e.target.value ? Number(e.target.value) : '')}
					>
						<option value="">Выберите модель</option>
						{carOptions.map((c) => (
							<option key={c.id} value={c.id}>
								{c.label}
							</option>
						))}
					</select>
					<div className="flex gap-3">
						<button className="px-4 py-2 rounded bg-[#0075B1] text-white disabled:bg-blue-300" onClick={handleSave} disabled={!selectedCar || saving}>
							{saving ? 'Сохранение…' : 'Закрепить'}
						</button>
						<button className="px-4 py-2 rounded border border-gray-300" onClick={handleClear} disabled={saving}>
							Удалить закрепление
						</button>
					</div>
				</section>

				<section className="rounded-xl border border-gray-200 p-5 shadow-sm bg-white space-y-3">
					<h2 className="text-lg font-medium">Мои заказы</h2>
					{renderOrders()}
				</section>
			</main>
			<Footer />
		</>
	)
}
