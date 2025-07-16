import pg from 'pg';
import dotenv from "dotenv";

dotenv.config({path:"./config/.env"});

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.HOSTNAME,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

export default pool;