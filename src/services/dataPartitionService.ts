import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";
import { decryptString } from "@/services/cryptoService";
import config from "../../config";

export async function getAllDataPartitions() {
    const session = await getServerSession(authOptions);
    const decrypted = decryptString(session?.user?.apiToken as string);

    const url: string = config.apiBaseUrl + '/api/datapartition/getall';
    
    const res = await fetch(url, {
        headers: {Authorization: `Bearer ${decrypted}`}
      })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    const data = await res.json();    
   
    return data;
  }