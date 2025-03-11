// lib/actions/user.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../cockroachdb";

export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pool = await connectToDatabase();
    const { rows } = await pool.query("SELECT * FROM users;");

    res.status(200).json(rows);

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


