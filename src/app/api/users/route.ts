import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { decryptString } from "@/services/cryptoService";
import { NextResponse } from "next/server";


export const GET = async (req: Request, res: NextResponse) =>  {
  try {

    const session = await getServerSession( authOptions)

    const decrypted = decryptString(session?.user?.apiToken as string);
    const res = await fetch(
      'http://localhost:44367/api/identity/getusers',
      {
        credentials: 'include', // Use credentials option instead of withCredentials
        headers: {
          Authorization: `Bearer ${decrypted}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json()

 return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    console.error(error);
    throw error; // You might want to handle the error appropriately in your application
  }
}