import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface JWT {
        accessToken?: string;
        expires?: any,
    }
    interface Session {
        user: {
            /** Oauth access token */
            accessToken?: string,
            refreshToken?: string,
            expires?: any,
        } & DefaultSession["user"];
    }
}