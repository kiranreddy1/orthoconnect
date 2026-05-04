import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

let _pool: Pool | undefined;
let _db: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDb() {
  if (_db) return _db;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set. See .env.example.');
  }

  _pool = new Pool({
    connectionString: url,
    ssl: url.includes('localhost') ? false : { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30_000,
  });

  _db = drizzle(_pool, { schema });
  return _db;
}

export { schema };
