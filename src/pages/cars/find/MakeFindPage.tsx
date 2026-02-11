import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GET_PROD_BASE_URL } from '@shared/config/query-client'
import { setCarCustom } from '@shared/api/user'
import Header from '@widgets/header/ui/Header'
import { Footer } from '@widgets/footer'

type ModelRow = {
	Make: string
	Model: string
	VehicleType?: string | null
}

const years = Array.from({ length: 26 }, (_, i) => 2000 + i)
const vehicleTypes = ['Passenger Car', 'Multipurpose Passenger Vehicle', 'Truck', 'Motorcycle', 'Bus']

export default function MakeFindPage() {
	const [params] = useSearchParams()
	const initialMake = params.get('make') ?? ''

	const [make, setMake] = useState(initialMake)
	const [year, setYear] = useState<number | ''>('')
	const [vehType, setVehType] = useState('')
	const [vin, setVin] = useState('')
	const [models, setModels] = useState<ModelRow[]>([])
	const [err, setErr] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [savingId, setSavingId] = useState<string | null>(null)

	const title = useMemo(() => make || 'Марка', [make])

	const fetchModels = async () => {
		if (!make.trim()) {
			setErr('Укажите марку')
			return
		}
		setLoading(true)
		setErr(null)
		setModels([])
		try {
			const useYear = !!year
			let url = ''
			if (useYear) {
				const typeSegment = vehType ? `/vehicletype/${encodeURIComponent(vehType)}` : ''
				url = `${GET_PROD_BASE_URL()}/api/vpic/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}${typeSegment}?format=json`
			} else {
				url = `${GET_PROD_BASE_URL()}/api/vpic/vehicles/GetModelsForMake/${encodeURIComponent(make)}?format=json`
			}
			const res = await fetch(url)
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const data = await res.json()
			const list: ModelRow[] = (data?.Results ?? []).slice(0, 20).map((r: any) => ({
				Make: r.Make_Name || r.Make || make,
				Model: r.Model_Name || r.Model || 'Unknown',
				VehicleType: r.VehicleTypeName || r.Vehicle_Type || null,
			}))
			setModels(list)
		} catch (e: any) {
			setErr(e?.message ?? 'Ошибка запроса')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (make) fetchModels()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Header />
			<main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
				<h1 className="text-2xl font-semibold">Подбор модели {title}</h1>

				<section className="grid gap-3 md:grid-cols-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
					<label className="flex flex-col gap-1 text-sm text-gray-700">
						Марка
						<input className="border rounded-lg px-3 py-2" value={make} onChange={(e) => setMake(e.target.value)} placeholder="Напр. Honda" />
					</label>
					<label className="flex flex-col gap-1 text-sm text-gray-700">
						Год выпуска
						<select className="border rounded-lg px-3 py-2" value={year} onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}>
							<option value="">Любой</option>
							{years.map((y) => (
								<option key={y} value={y}>
									{y}
								</option>
							))}
						</select>
					</label>
					<label className="flex flex-col gap-1 text-sm text-gray-700">
						Тип ТС
						<select className="border rounded-lg px-3 py-2" value={vehType} onChange={(e) => setVehType(e.target.value)}>
							<option value="">Любой</option>
							{vehicleTypes.map((t) => (
								<option key={t} value={t}>
									{t}
								</option>
							))}
						</select>
					</label>
					<label className="flex flex-col gap-1 text-sm text-gray-700">
						VIN (опционально)
						<input
							className="border rounded-lg px-3 py-2"
							value={vin}
							onChange={(e) => setVin(e.target.value)}
							placeholder="17 символов"
							maxLength={17}
						/>
					</label>
					<button
						type="button"
						className="md:col-span-4 h-[42px] px-4 rounded-lg bg-[#0075B1] text-white hover:bg-[#0267a3] disabled:bg-blue-300"
						onClick={fetchModels}
						disabled={loading}
					>
						{loading ? 'Поиск...' : 'Найти модели'}
					</button>
				</section>

				{err && <div className="text-sm text-red-500">{err}</div>}

				<section className="space-y-3">
					<h2 className="text-lg font-medium">Результаты</h2>
					<div className="grid gap-3 md:grid-cols-2">
						{models.map((m, i) => (
							<article key={`${m.Model}-${i}`} className="border rounded-xl p-4 shadow-sm bg-white">
								<div className="text-lg font-semibold">{m.Model}</div>
								<div className="text-sm text-gray-600">Марка: {m.Make}</div>
								{m.VehicleType && <div className="text-sm text-gray-600">Тип: {m.VehicleType}</div>}
								<button
									className="mt-3 px-3 py-2 rounded bg-[#0075B1] text-white text-sm disabled:bg-blue-300"
									onClick={async () => {
										setSavingId(`${m.Make}-${m.Model}-${i}`)
										setErr(null)
										try {
											await setCarCustom({
												make: m.Make,
												model: m.Model,
												year: year || undefined,
												vehicle_type: m.VehicleType || undefined,
											})
										} catch (e: any) {
											setErr(e?.message ?? 'Ошибка закрепления')
										} finally {
											setSavingId(null)
										}
									}}
									disabled={!!savingId}
								>
									{savingId === `${m.Make}-${m.Model}-${i}` ? 'Сохранение…' : 'Закрепить'}
								</button>
							</article>
						))}
						{models.length === 0 && !loading && <div className="text-sm text-gray-500">Нет данных</div>}
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
