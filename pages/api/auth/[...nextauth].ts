import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
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
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                // token.expires = Date.now() + account.expires_in * 1000,
            }
            // console.log(account)
            return token
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken as string;
            session.user.refreshToken = token.refreshToken as string;
            // console.log(token.refreshToken)
            // session.user.accessTokenExpires= account.expires_at * 1000
            return session;
        },

        // async jwt({ token, account, user }) {

        //     console.log(token)

        //     if (account) {
        //         token.accessToken = token.access_token
        //     }

        //     // token.user.accessToken = token.accessToken,

        //     return token
        //     // if (Date.now() < token.accessTokenExpires) {
        //     //     return token
        //     // }

        //     // return await refreshAccessToken(token)
        // },
        // async session({ session, token }) {

        //     console.log(token)

        //     session.user.accessToken = token.accessToken

        //     // if (session && token) {
        //     //     return {
        //     //         user: {
        //     //             ...session,
        //     //             accessToken: token.accessToken,
        //     //             refreshToken: token.refreshToken,
        //     //             // accessTokenExpires: account.expires_at * 1000
        //     //         }
        //     //     }
        //     // }
        //     return session
        // },

    }
}

export default NextAuth(authOptions)
