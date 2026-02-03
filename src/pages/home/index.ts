import { withSuspense } from '@shared/ui'
import { lazy } from 'react'

export const HomePage = withSuspense(lazy(() => import('./HomePage')))
