import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const GET_PROD_BASE_URL = () => {
  const prod_address = import.meta.env.PROD_BASE_URL
  if (prod_address) {
    return prod_address
  } else {
    console.warn("Couldn't resolve production url from environment variable. Using default value.")
    return 'http://127.0.0.1:8100'
  }
}
