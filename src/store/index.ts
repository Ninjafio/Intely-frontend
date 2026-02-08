import type { IProduct } from '@pages/catalog/model'
import { createStore, createEvent } from 'effector'

interface ITopBarFiltersValues {
  brand: string
  model: string
  year: string
  engine: string
}

export const $topBarFiltersValues = createStore<ITopBarFiltersValues>({
  brand: '',
  model: '',
  year: '',
  engine: '',
})

export const $Cart = createStore<IProduct[]>([])

export const $ActiveModal = createStore<string>('')

export const setCart = createEvent<IProduct[]>()
export const setTopBarFiltersValues = createEvent<ITopBarFiltersValues>()
export const setActiveModal = createEvent<string>('')

$Cart.on(setCart, (_, state) => state)
$ActiveModal.on(setActiveModal, (_, state) => state)
$topBarFiltersValues.on(setTopBarFiltersValues, (_, state) => state)
