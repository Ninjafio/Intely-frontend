import { lazy, type ComponentType } from 'react'
import withSuspense from './withSuspense'
export { withSuspense }

const lazyLoad = <T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) => withSuspense(lazy(factory))

export const RootLayout = lazyLoad(() => import('./root-layout'))

export const DropdownMenu = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenu })))
export const DropdownMenuPortal = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuPortal })))
export const DropdownMenuTrigger = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuTrigger })))
export const DropdownMenuContent = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuContent })))
export const DropdownMenuGroup = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuGroup })))
export const DropdownMenuLabel = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuLabel })))
export const DropdownMenuItem = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuItem })))
export const DropdownMenuCheckboxItem = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuCheckboxItem })))
export const DropdownMenuRadioGroup = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuRadioGroup })))
export const DropdownMenuRadioItem = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuRadioItem })))
export const DropdownMenuSeparator = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuSeparator })))
export const DropdownMenuShortcut = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuShortcut })))
export const DropdownMenuSub = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuSub })))
export const DropdownMenuSubTrigger = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuSubTrigger })))
export const DropdownMenuSubContent = lazyLoad(() => import('./dropdown-menu').then((m) => ({ default: m.DropdownMenuSubContent })))

export const Button = lazyLoad(() => import('./button').then((m) => ({ default: m.Button })))
export const Logo = lazyLoad(() => import('./logo'))
export const Telegram = lazyLoad(() => import('./tg'))
export const VK = lazyLoad(() => import('./vk'))
export const Mail = lazyLoad(() => import('./mail'))
