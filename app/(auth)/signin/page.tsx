'use client'

import { useState } from 'react'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: handle sign in logic
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-foreground/10 bg-background">
                <h1 className="text-2xl font-semibold text-foreground mb-6 text-center">
                    Sign In
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="px-4 py-2 rounded-lg border border-foreground/20 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 py-2 px-4 rounded-lg bg-foreground text-background font-medium hover:opacity-80 transition-opacity"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignIn
