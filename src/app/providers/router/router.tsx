import { APP_PATHS } from '@shared/config'
import { RootLayout } from '@shared/ui'
import { createBrowserRouter } from 'react-router-dom'
import { CatalogPage } from '@pages/catalog'
import { ItemPage } from '@pages/item'
import { HomePage } from '@pages/home'

export const router = createBrowserRouter([
  {
    path: APP_PATHS.MAIN,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: APP_PATHS.CATALOG, element: <CatalogPage /> },
      { path: APP_PATHS.ITEM, element: <ItemPage /> },
    ],
  },
])
