import axios from 'axios'
import { GET_PROD_BASE_URL } from '@shared/config/query-client'

const token = () => localStorage.getItem('jwt')

export type Me = {
	id: number
	email: string
	phone: string
	first_name?: string | null
	last_name?: string | null
	middle_name?: string | null
	balance?: number | null
	credit_limit?: number | null
	car_model?: string | null
	car_model_id?: number | null
}

export async function getMe(): Promise<Me> {
	const t = token()
	if (!t) throw new Error('Нет токена')
	const { data } = await axios.get<Me>(`${GET_PROD_BASE_URL()}/api/auth/me`, {
		headers: { Authorization: `Bearer ${t}` },
	})
	return data
}

export async function setCar(car_model_id: number): Promise<void> {
	const t = token()
	if (!t) throw new Error('Нет токена')
	await axios.post(`${GET_PROD_BASE_URL()}/api/user/car`, { car_model_id }, { headers: { Authorization: `Bearer ${t}` } })
}

export async function clearCar(): Promise<void> {
	const t = token()
	if (!t) throw new Error('Нет токена')
	await axios.delete(`${GET_PROD_BASE_URL()}/api/user/car`, {
		headers: { Authorization: `Bearer ${t}` },
	})
}

export type CarCustomPayload = {
	make: string
	model: string
	year?: number
	engine_hp?: number
	vehicle_type?: string
}

export async function setCarCustom(payload: CarCustomPayload): Promise<void> {
	const t = token()
	if (!t) throw new Error('Нет токена')
	await axios.post(`${GET_PROD_BASE_URL()}/api/user/car/custom`, payload, {
		headers: { Authorization: `Bearer ${t}` },
	})
}
