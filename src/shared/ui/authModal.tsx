import { type FormEvent, useState } from 'react'
import { setActiveModal, loginFx, registerFx } from '../../store'
import '../css/authModal.css'

type Mode = 'login' | 'register'

const AuthModal = () => {
	const [mode, setMode] = useState<Mode>('login')
	const [form, setForm] = useState({
		email: '',
		phone: '',
		password: '',
		first_name: '',
		last_name: '',
		middle_name: '',
	})
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			if (mode === 'login') {
				await loginFx({ email: form.email, password: form.password })
			} else {
				await registerFx({
					email: form.email,
					phone: form.phone,
					password: form.password,
					first_name: form.first_name,
					last_name: form.last_name,
					middle_name: form.middle_name || undefined,
				})
			}
			setActiveModal('')
		} catch (e: any) {
			setError(e?.message ?? 'Ошибка авторизации')
		} finally {
			setLoading(false)
		}
	}

	const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

	return (
		<div className="Modal">
			<div className="AuthModal__title">
				<h3>{mode === 'login' ? 'Авторизация' : 'Регистрация'}</h3>
				<button className="close__modal" onClick={() => setActiveModal('')}></button>
			</div>
			<div className="flex gap-2 mb-4">
				<button className={`tab ${mode === 'login' ? 'tab--active' : ''}`} onClick={() => setMode('login')}>
					Вход
				</button>
				<button className={`tab ${mode === 'register' ? 'tab--active' : ''}`} onClick={() => setMode('register')}>
					Регистрация
				</button>
			</div>
			<form onSubmit={onSubmit} className="space-y-3">
				<div className="InputAndLabel">
					<label htmlFor="email_auth">Электронная почта</label>
					<input id="email_auth" type="email" placeholder="mail@mail.ru" required value={form.email} onChange={update('email')} />
				</div>
				{mode === 'register' && (
					<div className="InputAndLabel">
						<label htmlFor="phone_auth">Телефон</label>
						<input id="phone_auth" type="tel" placeholder="+7" required value={form.phone} onChange={update('phone')} />
					</div>
				)}
				{mode === 'register' && (
					<div className="InputAndLabel grid grid-cols-1 gap-2 sm:grid-cols-2">
						<div>
							<label htmlFor="last_name">Фамилия</label>
							<input id="last_name" type="text" placeholder="Иванов" required value={form.last_name} onChange={update('last_name')} />
						</div>
						<div>
							<label htmlFor="first_name">Имя</label>
							<input id="first_name" type="text" placeholder="Иван" required value={form.first_name} onChange={update('first_name')} />
						</div>
						<div className="sm:col-span-2">
							<label htmlFor="middle_name">Отчество</label>
							<input id="middle_name" type="text" placeholder="Иванович" value={form.middle_name} onChange={update('middle_name')} />
						</div>
					</div>
				)}
				<div className="InputAndLabel">
					<label htmlFor="password_auth">Пароль</label>
					<input id="password_auth" type="password" placeholder="Пароль" required value={form.password} onChange={update('password')} />
				</div>

				{error && <p className="text-red-500 text-sm">{error}</p>}

				<button
					type="submit"
					className="h-[44px] bg-[#007BC1] text-white rounded-[8px] font-medium w-full hover:bg-[#0267a3] transition disabled:opacity-70"
					disabled={loading}
				>
					{loading ? '...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</form>
		</div>
	)
}

export default AuthModal
