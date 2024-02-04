import { authenticate } from "@/services/authenticationService";
import { encryptString } from "@/services/cryptoService";
import type { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { refreshTokens } from "../../../../../repositories/refreshToken";




export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {

          const res = await authenticate(credentials.email, credentials.password)
          if (res != null && typeof res !== "undefined") {

            const retVal = res;

            return retVal;
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token, user }) {

      const sanitizedToken = Object.keys(token).reduce((p, c) => {

        // strip unnecessary properties
        if (
          c !== "iat" &&
          c !== "exp" &&
          //c !== "apiToken" &&
          c !== "jti"
        ) {
          return { ...p, [c]: token[c] }
        } else {
          return p
        }
      }, {})

      let retUser: User = sanitizedToken as User;
      retUser.refreshToken = retUser.refreshToken;
      retUser.tokenExpiresAt = retUser.tokenExpiresAt;
      retUser.userId = token.sub ?? "";
      retUser.apiToken = encryptString(retUser.apiToken);

      return { ...session, user: retUser }
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      if (account) {
        // user has just signed in so the user object is populated
        token.apiToken = user.apiToken;
        token.email = user.email;
        token.roles = user.roles;
        token.refreshToken = user.refreshToken
        token.tokenExpiresAt = user.tokenExpiresAt

      }

      // Check if the access token is about to expire (e.g., within the next 30 seconds)
      const isAccessTokenExpiring = new Date(token.tokenExpiresAt as Date) < new Date();
      console.log({ isAccessTokenExpiring })


      if (isAccessTokenExpiring) {
        try {
          // Perform token refresh logic (this might involve making a request to your authentication server)
          const refreshData = {
            accessToken: token.apiToken as string,
            refreshToken: token.refreshToken as any,
            expiresAt: token.tokenExpiresAt as string,
          } as const;
          const refreshedToken: any = await refreshTokens(refreshData);

          // Update the token with the refreshed one
          token.apiToken = refreshedToken.accessToken;
          token.refreshToken = refreshedToken.refreshToken
          token.tokenExpiresAt = refreshedToken.expiresAt
        } catch (error) {
          // Handle token refresh failure
          console.error('Token refresh failed:', error);
        }
      }
      return token
    }
  }
}