import type { ProductDetail, ProductListItem, Review } from './types'

export function mockProductDetail(id: number): ProductDetail {
	return {
		id,
		title: 'Предохранитель Круглый 40A (36VDC) пласт. (уп. по 50 шт)',
		price: 10000,
		oldPrice: 15000,
		discount: 33,
		rating: 4,
		stock: 10,
		imageUrl: null,
		images: [],
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		specs: [
			{ label: 'Вес', value: '330 гр.' },
			{ label: 'Размер (ДхШхВ)', value: '55×300×280' },
			{ label: 'Номинал', value: '40A' },
			{ label: 'Напряжение', value: '36VDC' },
		],
		breadcrumbs: [{ label: 'Категория', href: '/catalog' }, { label: 'Подкатегория', href: '/catalog' }, { label: 'Товар' }],
	}
}

export const mockRelated: ProductListItem[] = [
	{ id: 2, title: 'Предохранитель Плоский 20A (24VDC)', price: 420, oldPrice: 600, discount: 30, rating: 4, stock: 21, imageUrl: null },
	{ id: 3, title: 'Предохранитель Мини 10A (12VDC), блистер 10 шт', price: 350, oldPrice: 480, discount: 27, rating: 5, stock: 14, imageUrl: null },
	{ id: 4, title: 'Предохранитель Круглый 60A (48VDC)', price: 13500, oldPrice: 16500, discount: 18, rating: 4, stock: 6, imageUrl: null },
	{ id: 5, title: 'Предохранитель Круглый 50A (36VDC)', price: 11500, oldPrice: 15000, discount: 23, rating: 4, stock: 10, imageUrl: null },
	{ id: 6, title: 'Предохранитель Плоский 30A (24VDC)', price: 590, oldPrice: 770, discount: 23, rating: 4, stock: 7, imageUrl: null },
]

export const mockReviews: Review[] = [
	{
		id: 1,
		author: 'Иван',
		rating: 4,
		comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		createdAt: new Date().toISOString(),
	},
	{
		id: 2,
		author: 'Мария',
		rating: 5,
		comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		createdAt: new Date().toISOString(),
	},
	{
		id: 3,
		author: 'Павел',
		rating: 3,
		comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		createdAt: new Date().toISOString(),
	},
]
