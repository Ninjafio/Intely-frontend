import { lazy } from 'react'
import { withSuspense } from '@shared/ui'

export const OrderModal = withSuspense(lazy(() => import('./OrderModal')))
