import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }; 

  interface User {
    email: string;
    apiToken: string;
    refreshToken: RefreshToken;
    roles: string[];
    userId: string;
    tokenExpiresAt: string;
    isLockedOut: boolean;
    isNotAllowed: boolean;
    requiresTwoFactor: boolean;
    
  }

  interface RefreshToken {
    userName: string;
    tokenString: string;
    expireAt: string;
}


}