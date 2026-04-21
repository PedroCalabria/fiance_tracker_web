'use client'

import { useState } from 'react'

const GeneralView = () => {
    const [text, setText] = useState('')
    const [summary, setSummary] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setError(null)
        setSummary(null)
        setLoading(true)

        try {
            const token = localStorage.getItem('token')

            const response = await fetch('/api/proxy/balance/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ period: text }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data?.message ?? 'Failed to load data.')
                return
            }

            setSummary(
                typeof data.summary === 'string'
                    ? data.summary
                    : JSON.stringify(data.summary, null, 2),
            )
        } catch {
            setError('Could not connect to the server.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col gap-4 w-full max-w-sm">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Digite algo…"
                    className="px-4 py-2 rounded-lg border border-foreground/20 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                />
                <button
                    onClick={handleClick}
                    disabled={loading}
                    className="py-2 px-4 rounded-lg bg-foreground text-background font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
                >
                    {loading ? 'Carregando…' : 'Confirmar'}
                </button>

                {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                {summary && (
                    <pre className="p-4 rounded-lg border border-foreground/10 text-sm text-foreground whitespace-pre-wrap break-words">
                        {summary}
                    </pre>
                )}
            </div>
        </div>
    )
}

export default GeneralView
