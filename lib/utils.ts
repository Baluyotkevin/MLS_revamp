import { NeonQueryFunction } from "@neondatabase/serverless"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { plansMap } from "./constants";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export async function hasCancelledSubscription(
  sql: NeonQueryFunction<false, false>,
  email: string
) {
  const query = await sql`SELECT * FROM users WHERE email = ${email} AND status = 'cancelled'`;
  return query && query.length === 0;
};

export async function getPlanType(priceId : string) {
  const checkPlanType = plansMap.filter(plan => plan.priceId === priceId)
  return checkPlanType?.[0]
};

export async function updateUser(
  sql: NeonQueryFunction<false, false>,
  userId: string,
  email: string
) {
  return await sql`UPDATE users SET user_id = ${userId} WHERE email = ${email}`;
};

export async function doesUserExist(
  sql: NeonQueryFunction<false, false>,
  email: string
) {
  const query = await sql`SELECT * FROM users where email = ${email}`;
  if (query && query.length > 0) {
    return query
  }
    return false;
};