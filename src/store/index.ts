import { createStore, createEvent, createEffect, sample } from 'effector'
import { createGate } from 'effector-react'
import { login as apiLogin, register as apiRegister, type LoginPayload, type RegisterPayload } from '@shared/api/auth'

export const $ActiveModal = createStore<string>('')
export const setActiveModal = createEvent<string>('')
$ActiveModal.on(setActiveModal, (_, state) => state)

export const $token = createStore<string | null>(localStorage.getItem('jwt') || null)
export const setToken = createEvent<string | null>()
$token.on(setToken, (_, t) => {
  if (t) localStorage.setItem('jwt', t)
  else localStorage.removeItem('jwt')
  return t
})

export const loginFx = createEffect<LoginPayload, string>(async (payload) => apiLogin(payload))
export const registerFx = createEffect<RegisterPayload, string>(async (payload) => apiRegister(payload))

sample({ clock: loginFx.doneData, target: setToken })
sample({ clock: registerFx.doneData, target: setToken })

export const AuthGate = createGate()
