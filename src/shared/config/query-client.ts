import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const GET_PROD_BASE_URL = () => {
  const maybe = (import.meta as any).env?.VITE_API_URL || (import.meta as any).env?.PROD_BASE_URL
  if (maybe) return maybe
  console.warn("Couldn't resolve API url from environment variable. Using default value.")
  return 'http://127.0.0.1:8100'
}

export const buildApiUrl = (path: string) => `${GET_PROD_BASE_URL()}${path}`
