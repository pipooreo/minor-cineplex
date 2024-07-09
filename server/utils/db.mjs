import * as pg from "pg";
const { Pool } = pg.default;
import "dotenv/config";

const connectionPool = new Pool({
  // connectionString: process.env.DB_POSTGRES,
  //   postgresql://postgres.igggdymrgqaaedtkkmre:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
  user: process.env.DB_POSTGRES_USER,
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  database: "postgres",
  password: process.env.DB_POSTGRES_PASSWORD,
  port: "6543",
});

export default connectionPool;
