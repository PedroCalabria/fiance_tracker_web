'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authService } from '@/services/auth.service'
import { ApiError } from '@/lib/api-client'

const SignUp = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await authService.register({ name, email, password })
        } catch (err) {
            setLoading(false)
            setError(
                err instanceof ApiError ? err.message : 'Registration failed.',
            )
            return
        }

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (result?.error) {
            setError(
                'Account created but sign-in failed. Please sign in manually.',
            )
            router.push('/signin')
            return
        }

        router.push('/general')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-foreground/10 bg-background">
                <h1 className="text-2xl font-semibold text-foreground mb-6 text-center">
                    Create Account
                </h1>
                {error && (
                    <p className="mb-4 text-sm text-red-500 text-center">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-foreground"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="px-4 py-2 rounded-lg border border-foreground/20 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-foreground"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="px-4 py-2 rounded-lg border border-foreground/20 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-foreground"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 characters"
                            className="px-4 py-2 rounded-lg border border-foreground/20 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 py-2 px-4 rounded-lg bg-foreground text-background font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                        {loading ? 'Creating account…' : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-foreground/60">
                    Already have an account?{' '}
                    <Link
                        href="/signin"
                        className="underline hover:text-foreground"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
