import { neon } from "@neondatabase/serverless";

const NEONDB_URI = process.env.NEONDB_URI; // Updated to NEONDB_URI

let cached = (global as any).neon || { conn: null, promise: null };

export const connectToDB = async () => {
  if (cached.conn) return cached.conn;

  if (!NEONDB_URI) throw new Error('NEONDB_URI is missing');

  cached.promise = cached.promise || neon(NEONDB_URI);

  cached.conn = await cached.promise;

  return cached.conn;
};