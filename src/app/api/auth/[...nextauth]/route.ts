import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";



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
console.log( email, password)
        const user = await User.findOne({ email }).select("+password");
        console.log({user})

        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        console.log({password})
        console.log(user.password)
        console.log({isPasswordMatched})

        if (!isPasswordMatched) {
          throw Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      console.log(session.user)
      session.user = token.user;
      console.log(token.user)

      // delete password from session
    //   delete session?.user?.password;
      return session;
    },
  },
  
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
