
import { query } from "@/utils/dbs";

export async function GET() {
    const users = await query({
        query: "SELECT * FROM envotech.DataPartition",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}
