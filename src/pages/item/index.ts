import { withSuspense } from '@shared/ui'
import { lazy } from 'react'

export const ItemPage = withSuspense(lazy(() => import('../item/ItemPage')))