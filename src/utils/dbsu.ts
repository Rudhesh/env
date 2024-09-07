import mysql, {
  OkPacket,
  RowDataPacket,
  ResultSetHeader,
  ProcedureCallPacket,
} from "mysql2/promise";

interface QueryParams {
  queryText: string;
  values?: any[];
  host: string;
  user: string;
  password: string;
  database: string;
}

export async function query<T extends RowDataPacket[] | OkPacket | ResultSetHeader | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket>({
  queryText,
  values = [],
  host,
  user,
  password,
  database,
}: QueryParams): Promise<T> {
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
    const [results] = await dbconnection.execute<T>(queryText, values);
    return results;
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    await dbconnection.end();
  }
}
