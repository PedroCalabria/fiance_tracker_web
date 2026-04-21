import { NextRequest, NextResponse } from 'next/server'
import { request as httpsRequest } from 'node:https'
import { request as httpRequest } from 'node:http'

function fetchFromApi(urlStr: string, token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const url = new URL(urlStr)
        const isHttps = url.protocol === 'https:'
        const requester = isHttps ? httpsRequest : httpRequest

        const options = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: url.pathname + url.search,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
    }

    const { period } = await request.json()

    const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Balance/getFinancialSummaryData`,
    )
    if (period) {
        url.searchParams.set('period', period)
    }

    let raw: string
    try {
        raw = await fetchFromApi(url.toString(), token)
    } catch {
        return NextResponse.json(
            { message: 'Could not reach the API.' },
            { status: 502 },
        )
    }

    let summary: unknown
    try {
        summary = JSON.parse(raw)
    } catch {
        summary = raw.trim()
    }

    return NextResponse.json({ summary })
}
