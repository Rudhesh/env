// Assuming you have this in a file like lib/db.js
import mysql from "mysql2/promise";

export async function query({ queryText, values = [], host, user, password, database }) {
  if (!host || !user || !password || !database) {
    throw new Error("Database connection parameters are missing");
  }

  const dbconnection = await mysql.createConnection({
    host,
    user,
    password,
    database,
  });

  try {
    const [results] = await dbconnection.execute(queryText, values);
    return results;
  } catch (error) {
    throw Error(error.message);
  } finally {
    await dbconnection.end();
  }
}
