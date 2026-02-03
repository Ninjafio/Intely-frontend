import { z } from 'zod'

export const orderSchema = z.object({
  name: z.string().min(1, 'Укажите имя'),
  phone: z.string().min(1, 'Укажите телефон'),
  email: z.string().email('Укажите корректный e-mail'),

  comment: z
    .string()
    .min(1, 'Укажите комментарий')
    .transform((v) => v ?? ''),

  productId: z.number().min(1),
  productTitle: z.string().min(1),
  productPrice: z.coerce.number().positive(),

  privacyAccepted: z.boolean().refine((v) => v === true, { message: 'Необходимо принять политику конфиденциальности' }),
  personalDataAccepted: z.boolean().refine((v) => v === true, { message: 'Необходимо дать согласие на обработку персональных данных' }),
})
