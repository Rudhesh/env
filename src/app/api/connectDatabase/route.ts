// pages/api/connectDatabase.js

import { NextApiRequest, NextApiResponse } from 'next';
import { query } from "@/utils/dbsu";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { host, user, password, database } = req.body;

    try {
      // Temporary connection for testing purposes
      const results = await query({
        queryText: "SELECT * FROM your_table_name LIMIT 1", // Example query
        values: [], // Include query values if necessary
        host,
        user,
        password,
        database,
      });
      return res.status(200).json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to connect to the database" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
