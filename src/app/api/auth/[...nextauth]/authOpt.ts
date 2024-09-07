import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

// Define your auth options
export const authOptions : NextAuthOptions = {
  session: {
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
      async authorize(credentials: any) {
        await connect();

        const { email, password } = credentials;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      console.log({ token, user })
      if (user) {
        token.user = user;
      }
      console.log("tt", token)
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      console.log({ session, token })
      session.user = token.user;
      console.log("ss", session)

      return session;
    },
  },
};

// // Define the handler
// const handler = NextAuth(authOptions);

// // Export the handler directly without using `OmitWithTag`
// export { handler as GET, handler as POST };
