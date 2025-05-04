'use client'

import { Toaster } from 'sonner'

export function AppToaster() {
  return (
    <Toaster
      toastOptions={{
        classNames: {
          toast: "bg-zinc-900 text-white border border-zinc-700",
          success: "bg-emerald-600 text-white",
          error: "bg-red-700 text-white",
          info: "bg-blue-600 text-white",
        },
      }}
    />
  )
}
