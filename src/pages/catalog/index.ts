import { withSuspense } from '@shared/ui'
import { lazy } from 'react'

export const CatalogPage = withSuspense(lazy(() => import('./CatalogPage')))
