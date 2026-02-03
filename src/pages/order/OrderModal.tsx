import { useEffect, useState, type MouseEvent } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type z from 'zod'

import { orderSchema } from './config'
import { sendOrderToTelegram } from './api'
import type { IProduct } from '@pages/catalog/model'

type OrderFormValues = z.infer<typeof orderSchema>
type OrderModalProduct = Pick<IProduct, 'id' | 'title' | 'price'>

type OrderModalProps = {
  isOpen: boolean
  onClose: () => void
  product: OrderModalProduct | null
}

export default function OrderModal({ isOpen, onClose, product }: OrderModalProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [visible, setVisible] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderFormValues>({
    //@ts-ignore
    resolver: zodResolver(orderSchema),
    defaultValues: {
      comment: '',
      email: '',
      name: '',
      phone: '',
      productId: Number(product?.id ?? ''),
      productTitle: product?.title ?? '',
      productPrice: product?.price ?? 0,
      privacyAccepted: false,
      personalDataAccepted: false,
    },
  })

  useEffect(() => {
    if (product) {
      reset({
        comment: '',
        email: '',
        name: '',
        phone: '',
        productId: Number(product.id),
        productTitle: product.title,
        productPrice: product.price,
        privacyAccepted: false,
        personalDataAccepted: false,
      })
      setIsSuccess(false)
    }
  }, [product, reset])

  const handleClose = () => {
    setIsSuccess(false)
    onClose()
  }

  useEffect(() => {
    const shouldBeOpen = isOpen && !!product
    if (shouldBeOpen) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [isOpen, product])

  useEffect(() => {
    const shouldBeOpen = isOpen && !!product

    if (!shouldBeOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, product])

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    console.log('first')
    try {
      console.log('try')
      await sendOrderToTelegram(data)
      setIsSuccess(true)
      reset()
    } catch (error) {
      console.error('Ошибка в onSubmit:', error)
      alert('Произошла ошибка при отправке заказа. Попробуйте еще раз.')
    }
  }

  if (!product) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 transition-opacity duration-200 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onMouseDown={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-[20px] p-6 w-full max-w-md relative transform transition-all duration-200 ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="absolute right-4 top-4 text-[22px] text-[#707070] hover:text-black transition-colors" onClick={handleClose}>
          ×
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center gap-6 py-4">
            <h3 className="text-[16px] font-semibold text-[#0B0D0D] text-center">Ваш заказ принят!</h3>
            <p className="text-[#313131] text-base text-center leading-[1.4]">
              Спасибо за заказ! Информация об оплате, доставке и&nbsp;статусе заказа будет отправлена на&nbsp;эл. почту
            </p>
            <button
              type="button"
              className="mt-2 w-full rounded-[10px] bg-[#0075B1] py-3 px-4 text-center text-white text-base font-medium"
              onClick={handleClose}
            >
              На главную
            </button>
          </div>
        ) : (
          //@ts-ignore
          <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit, (errors) => console.log('validation errors', errors))}>
            <div className="p-4 rounded-lg mb-2 flex flex-col gap-2 ">
              <h3 className="font-semibold text-xl">Введите данные для заказа:</h3>
              <ul>
                <li>
                  <p>Название товара: {product.title}</p>
                </li>
                <li>
                  <p className="font-medium">Цена: {product.price} руб.</p>
                </li>
              </ul>
            </div>

            <label className="text-[#313131] text-[16px] leading-5">
              Фамилия Имя
              <input type="text" placeholder="Иванов Иван" className="w-full border mt-2 rounded-[10px] px-2.5 py-2" {...register('name')} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </label>

            <label className="text-[#313131] text-[16px] leading-5">
              Телефон
              <input type="tel" placeholder="+7 (999) 123-45-67" className="w-full border mt-2 rounded-[10px] px-2.5 py-2" {...register('phone')} />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </label>

            <label className="text-[#313131] text-[16px] leading-5">
              Электронная почта
              <input type="email" placeholder="mail@mail.ru" className="w-full border mt-2 rounded-[10px] px-2.5 py-2" {...register('email')} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </label>

            <label className="text-[#313131] text-[16px] leading-5">
              Комментарий к заказу
              <textarea placeholder="Комментарий к заказу" className="w-full border mt-2 rounded-[10px] px-2.5 py-2 h-24" {...register('comment')} />
              {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
            </label>

            <fieldset className="flex flex-col gap-3 text-sm text-[#313131]">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300" {...register('privacyAccepted')} />
                <span>
                  Я принимаю условия{' '}
                  <a href="#" rel="noreferrer" className="text-[#707070] underline">
                    политики конфиденциальности
                  </a>
                </span>
              </label>
              {errors.privacyAccepted && <p className="text-red-500 text-xs">{errors.privacyAccepted.message}</p>}

              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300" {...register('personalDataAccepted')} />
                <span>
                  Я даю согласие на{' '}
                  <a href="#" rel="noreferrer" className="text-[#707070] underline">
                    обработку персональных данных
                  </a>
                </span>
              </label>
              {errors.personalDataAccepted && <p className="text-red-500 text-xs">{errors.personalDataAccepted.message}</p>}
            </fieldset>

            <input type="hidden" {...register('productId')} />
            <input type="hidden" {...register('productTitle')} />
            <input type="hidden" {...register('productPrice', { valueAsNumber: true })} />

            <button type="submit" className="bg-[#0075B1] text-white rounded-[8px] py-2 px-4 w-full disabled:bg-blue-400" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Заказать'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
