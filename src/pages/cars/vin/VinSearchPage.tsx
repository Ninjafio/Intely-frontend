import { useState } from 'react'
import { GET_PROD_BASE_URL } from '@shared/config/query-client'

type VinRow = {
  Variable: string
  Value: string | null
}

export default function VinSearchPage() {
  const [vin, setVin] = useState('')
  const [year, setYear] = useState('')
  const [rows, setRows] = useState<VinRow[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    setRows([])
    if (!vin.trim()) {
      setErr('Введите VIN')
      return
    }
    setLoading(true)
    try {
      const qs = new URLSearchParams()
      qs.set('format', 'json')
      if (year.trim()) qs.set('modelyear', year.trim())
      const res = await fetch(`${GET_PROD_BASE_URL()}/api/vpic/vehicles/DecodeVin/${encodeURIComponent(vin.trim())}?${qs.toString()}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const list = (data?.Results ?? []).map((r: any) => ({ Variable: r.Variable || r.Name, Value: r.Value || null }))
      setRows(list)
    } catch (e: any) {
      setErr(e?.message ?? 'Ошибка запроса')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Проверка VIN</h1>

      <form className="grid gap-3 sm:grid-cols-[1fr,160px,120px] items-end" onSubmit={onSubmit}>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          VIN
          <input
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            className="border rounded-lg px-3 py-2"
            placeholder="5UXWX7C5*BA"
            maxLength={17}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Год (опц.)
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-lg px-3 py-2"
            placeholder="2011"
          />
        </label>
        <button
          type="submit"
          className="h-[42px] px-4 rounded-lg bg-[#0075B1] text-white hover:bg-[#0267a3] disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Запрос...' : 'Decode VIN'}
        </button>
      </form>

      {err && <div className="text-sm text-red-500">{err}</div>}

      {rows.length > 0 && (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <tbody>
              {rows.slice(0, 30).map((r, i) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="px-3 py-2 text-gray-600 w-1/3">{r.Variable}</td>
                  <td className="px-3 py-2">{r.Value ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
