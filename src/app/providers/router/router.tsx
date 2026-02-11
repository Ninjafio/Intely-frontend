import { APP_PATHS } from '@shared/config'
import { RootLayout } from '@shared/ui'
import { createBrowserRouter } from 'react-router-dom'
import { CatalogPage } from '@pages/catalog'
import { ItemPage } from '@pages/item'
import { HomePage } from '@pages/home'
import { ProfilePage } from '@pages/profile'
import { VinSearchPage } from '@pages/cars/vin'
import { MakeFindPage } from '@pages/cars/find'
import { CartPage } from '@pages/cart'

export const router = createBrowserRouter([
  {
    path: APP_PATHS.MAIN,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: APP_PATHS.CATALOG, element: <CatalogPage /> },
      { path: APP_PATHS.ITEM, element: <ItemPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/cars/vin', element: <VinSearchPage /> },
      { path: '/cars/find', element: <MakeFindPage /> },
      { path: APP_PATHS.CART, element: <CartPage /> },
    ],
  },
])
