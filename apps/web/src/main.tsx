import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Turizm Rehberi - React Query v5</h1>
        <p>Framework v5 kurulumu tamamlandı!</p>
      </div>
    </QueryClientProvider>
  </React.StrictMode>,
)
