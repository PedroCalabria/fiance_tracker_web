import { NextRequest, NextResponse } from 'next/server'
import { request as httpsRequest } from 'node:https'
import { request as httpRequest } from 'node:http'

function fetchFromApi(urlStr: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const url = new URL(urlStr)
        const isHttps = url.protocol === 'https:'
        const requester = isHttps ? httpsRequest : httpRequest

        const options = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: url.pathname + url.search,
            method: 'GET',
            // Allow self-signed certificates in development
            rejectUnauthorized: false,
        }

        const req = requester(options, (res) => {
            let data = ''
            res.on('data', (chunk: string) => (data += chunk))
            res.on('end', () => resolve(data))
        })

        req.on('error', reject)
        req.end()
    })
}

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()

    const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/getJWTToken`,
    )
    url.searchParams.set('email', email)
    url.searchParams.set('password', password)

    let raw: string
    try {
        raw = await fetchFromApi(url.toString())
    } catch {
        return NextResponse.json(
            { message: 'Could not reach the API.' },
            { status: 502 },
        )
    }

    let token: string
    try {
        // .NET may return a JSON-encoded string ("token") or plain text (token)
        const parsed = JSON.parse(raw)
        token = typeof parsed === 'string' ? parsed : String(parsed)
    } catch {
        // Treat raw body as plain-text token
        token = raw.trim()
    }

    if (!token) {
        return NextResponse.json(
            { message: 'Invalid email or password.' },
            { status: 401 },
        )
    }

    return NextResponse.json({ token })
}
