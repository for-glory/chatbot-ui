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


  const Styles = {
    divStyles: {
        width: "100%",
    },
    pStyles: {
        background: "linear-gradient(60deg,#ef5350,#e53935)",
    },
    borderShadowStyles: {
        box-shadow: "0 4px 20px 0 rgba(0,0,0,.14),0 7px 10px -5px rgba(244,67,54,.4)",
    },
    textStyles: {
        color: black,
    },    
};

  
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

            <div className="">
                              
                <label className="text-md text-neutral-400">Link to: Training and learning patform</label>
                <label className="text-md text-neutral-400">Accept terms and conditions</label>  
                <input
                        type="checkbox"
                        checked={disabled}
                        onChange={(e) => setDisabled(e.target.checked)}
                    />
                <div>                  
                    <input type="text" 
                           className="rounded-md px-4 py-2 bg-inherit border mb-6 text-neutral-100"
                           style={Styles.divStyles}
                           name="email"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           placeholder="you@example.com"
                           disabled={!disabled} />
                </div>
                <div className="card" style={Styles.pStyles}>
                  <div className="card-body" style={Styles.borderShadowStyles}>
                    aazd dazadz adz dzda z
                  </div>
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
                    Sign In With Magic Link
                  </button>
                </p>
              </>
            ) : null}
            {view === 'sign-in-magic' ? (
              <>                  
                <button className="bg-green-700 rounded px-4 py-2 text-neutral-200 mb-6" disabled={!disabled}>
                  Sign In With Magic Link 
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
                    Sign In With Magic Link 
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
