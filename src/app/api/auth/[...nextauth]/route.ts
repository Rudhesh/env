import NextAuth from "next-auth";
import { authOptions } from "./authOpt";


// Define the handler
const handler = NextAuth(authOptions);

// Export the handler directly without using `OmitWithTag`
export { handler as GET, handler as POST };
