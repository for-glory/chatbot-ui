'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Callback() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const { code } = router.query
    const exchangeCodeForSession = async (code: any) => {
      await supabase.auth.exchangeCodeForSession(code)
      router.replace('/')
    }

    if (code) {
      exchangeCodeForSession(code)
    }

    return () => {}
  }, [router])

  // return (
  //   <div className="h-screen w-screen flex justify-center">
  //     <div className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2">
  //       <p className="text-center text-neutral-400">
  //         You'll be redirected shortly...
  //       </p>
  //     </div>
  //   </div>
  // )
  return null
}
