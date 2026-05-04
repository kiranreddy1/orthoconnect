import { Pool } from 'pg';

async function main() {
  const url = process.env.DATABASE_URL!;
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
  const r = await pool.query(`
    SELECT table_name, (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) AS columns
    FROM information_schema.tables t
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `);
  console.log('Tables in DB:');
  for (const row of r.rows) {
    console.log(`  ${row.table_name}: ${row.columns} columns`);
  }
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
