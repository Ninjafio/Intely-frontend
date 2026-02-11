import axios from 'axios'
import { buildApiUrl } from '@shared/config/query-client'

export type RegisterPayload = {
  email: string
  phone: string
  password: string
  first_name: string
  last_name: string
  middle_name?: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type TokenResponse = {
  token: string
}

export async function register(payload: RegisterPayload): Promise<string> {
  const { data } = await axios.post<TokenResponse>(buildApiUrl('/api/auth/register'), payload)
  return data.token
}

export async function login(payload: LoginPayload): Promise<string> {
  const { data } = await axios.post<TokenResponse>(buildApiUrl('/api/auth/login'), payload)
  return data.token
}
