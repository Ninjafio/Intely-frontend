import { useQuery } from '@tanstack/react-query'
import { MOCK_PRODUCTS } from './mock'
import type { ICatalogFilters, IProduct } from '../model'
import { GET_PROD_BASE_URL } from '@shared/config/query-client'

const KEY = {
	products: (params: ICatalogFilters) => ['catalog', 'products', params] as const,
}

function buildQueryString(params: ICatalogFilters) {
	const sp = new URLSearchParams()
	if (params.q) sp.set('q', params.q)
	if (params.groups?.length) sp.set('groups', params.groups.join(','))
	if (typeof params.priceFrom === 'number') sp.set('price_from', String(params.priceFrom))
	if (typeof params.priceTo === 'number') sp.set('price_to', String(params.priceTo))
	return sp.toString() ? `?${sp.toString()}` : ''
}

export function useProductsQuery(params: ICatalogFilters) {
	return useQuery<IProduct[]>({
		queryKey: KEY.products(params),
		queryFn: async (): Promise<IProduct[]> => {
			try {
				const res = await fetch(`${GET_PROD_BASE_URL()}/api/products${buildQueryString(params)}`)
				if (!res.ok) throw new Error('HTTP error ' + res.status)
				const json = (await res.json()) as IProduct[]
				return json
			} catch {
				const q = (params.q ?? '').trim().toLowerCase()
				const groups = new Set(params.groups ?? [])
				const pf = typeof params.priceFrom === 'number' ? params.priceFrom : -Infinity
				const pt = typeof params.priceTo === 'number' ? params.priceTo : Infinity

				return MOCK_PRODUCTS.filter((p) => {
					const okQ = q ? p.title.toLowerCase().includes(q) : true
					const okG = groups.size > 0 ? Array.from(groups).some((g) => p.title.toLowerCase().startsWith(g.toLowerCase())) : true
					const okP = p.price >= pf && p.price <= pt
					return okQ && okG && okP
				})
			}
		},
	})
}
