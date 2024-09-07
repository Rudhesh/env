// app/api/connectDatabase/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/utils/dbsu';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { host, user, password, database } = body;

    const results = await query({
      queryText: 'SELECT * FROM your_table_name LIMIT 1',
      values: [],
      host,
      user,
      password,
      database,
    });

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to connect to the database' }, { status: 500 });
  }
}
