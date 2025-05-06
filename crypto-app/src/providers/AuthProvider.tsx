'use client'

import { ReactNode, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useAuthStore } from '@/stores/authStore'


export default function AuthProvider({ children }: {children: ReactNode}) {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      setIsAuth(!!session)
    }

    checkSession()
  }, [setIsAuth])

  return <>{children}</>
}
