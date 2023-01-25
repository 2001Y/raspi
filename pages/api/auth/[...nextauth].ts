import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        GoogleProvider({
            clientId: "637719826334-gh3u8qqpr439ff1vnfunvav5q45t6jm7.apps.googleusercontent.com",
            clientSecret: "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",
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/tasks.readonly"
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    // accessTokenExpires: account.expires_at * 1000
                }
            } else {
                return {
                    ...token
                    // accessTokenExpires: account.expires_at * 1000
                }
            }

            // if (Date.now() < token.accessTokenExpires) {
            //     return token
            // }

            // return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            if (session && token) {
                return {
                    ...session,
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                    // accessTokenExpires: account.expires_at * 1000
                }
            }
            return session
        },

    }
}

export default NextAuth(authOptions)
