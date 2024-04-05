import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";



export const authOptions: AuthOptions = {  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials:any) { // Use the explicitly defined Credentials type
        connect();

        const { email, password } = credentials;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw Error("Invalid Email or Password");
        }

        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      console.log(session.user)
      session.user = token.user as any;
      console.log(token.user)
      return session;
    },
  },
  
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
