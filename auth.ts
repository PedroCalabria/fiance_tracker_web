import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authService } from '@/services/auth.service'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                try {
                    const result = await authService.login({
                        email: credentials.email as string,
                        password: credentials.password as string,
                    })

                    return {
                        id: result.user.id,
                        name: result.user.name,
                        email: result.user.email,
                        accessToken: result.accessToken,
                    }
                } catch {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.accessToken = (
                    user as typeof user & { accessToken: string }
                ).accessToken
            }
            return token
        },
        session({ session, token }) {
            session.accessToken = token.accessToken as string
            return session
        },
    },
    pages: {
        signIn: '/signin',
    },
})
