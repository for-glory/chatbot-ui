'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

import logoImage from './logo.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState('sign-in-magic')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    setView('check-email')
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.push('/')
  }

  const handleSignInWithMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    if (error) {
      toast.error(error.message)
    } else {
      setView('check-email')
    }
  }

  const [disabled, setDisabled] = useState(false);
  
  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2">
        {view === 'check-email' ? (
          <p className="text-center text-neutral-400">
            Check <span className="font-bold text-white">{email}</span> to
            continue
          </p>
        ) : (
          <form
            className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2"
            onSubmit={view === 'sign-in' ? handleSignIn : view === 'sign-in-magic' ? handleSignInWithMagicLink : handleSignUp}
          >
            <div className="flex justify-center mb-12">
              <Image
                src={logoImage}
                alt="Chatbot UI"
              />
            </div>


            <div className="container">
                <label className="text-white">Link to: Training and learning patform</label>
                <label className="text-white">Accept terms and conditions</label>
                <div className="input-group">
                    <input
                        type="checkbox"
                        checked={disabled}
                        onChange={(e) => setDisabled(e.target.checked)}
                    />
                    <input type="text" 
                           className="rounded-md px-4 py-2 bg-inherit border mb-6 text-neutral-100"
                           name="email"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           placeholder="you@example.com"
                           disabled={!disabled} />
                </div>
            </div>
                  
  
            {view !== 'sign-in-magic' ? (
              <>
                <label className="text-md text-neutral-400" htmlFor="password">
                  Password
                </label>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border mb-6 text-neutral-100"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                />
              </>
            ) : null}
            {view === 'sign-in' ? (
              <>
                <button className="bg-green-700 rounded px-4 py-2 text-neutral-200 mb-6">
                  Sign In
                </button>
                <p className="text-sm text-neutral-500 text-center">
                  Don&apos;t have an account?
                  <button
                    className="ml-1 text-white underline"
                    onClick={() => setView('sign-up')}
                  >
                    Sign Up Now
                  </button>
                  &nbsp;or&nbsp;
                  <button
                    className="ml-1 text-white underline"
                    onClick={() => setView('sign-in-magic')}
                  >
                    Sign In With Magic Link 1
                  </button>
                </p>
              </>
            ) : null}
            {view === 'sign-in-magic' ? (
              <>                  
                <button className="bg-green-700 rounded px-4 py-2 text-neutral-200 mb-6">
                  Sign In With Magic Link 2
                </button>
                {/* <p className="text-sm text-neutral-500 text-center">
                  Don&apos;t have an account?
                  <button
                    className="ml-1 text-white underline"
                    onClick={() => setView('sign-up')}
                  >
                    Sign Up Now
                  </button>
                  &nbsp;or&nbsp;
                  <button
                    className="ml-1 text-white underline"
                    onClick={() => setView('sign-in')}
                  >
                    Sign In
                  </button>
                </p> */}
              </>
            ) : null}
            {view === 'sign-up' ? (
              <>
                <button className="bg-green-700 rounded px-4 py-2 text-neutral-200 mb-6">
                  Sign Up
                </button>
                <p className="text-sm text-neutral-500 text-center">
                  Already have an account?
                  <button
                    className="ml-1 text-white underline"
                    onClick={() => setView('sign-in')}
                  >
                    Sign In Now
                  </button>
                  &nbsp;or&nbsp;
                  <button
                    className="ml-1 text-white underline"
                    onClick={() => setView('sign-in-magic')}
                  >
                    Sign In With Magic Link 3
                  </button>
                </p>
              </>
            ) : null}
          </form>
        )}
      </div>
    </div>
  )
}
