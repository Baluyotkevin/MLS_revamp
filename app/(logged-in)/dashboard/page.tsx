import { plansMap } from '@/lib/constants';
import { connectToDB } from '@/lib/database';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

const Dashboard = async () => {

  const clerkUser = await currentUser();

  const email = clerkUser?.emailAddresses[0].emailAddress ?? ""
  const sql = await connectToDB();

  let userId = null;
  let planType = null;

  const user = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (user && user.length > 0) {
      userId = clerkUser?.id;
      await sql`UPDATE users SET user_id = ${userId} WHERE email = ${email}`;
      const priceId = user[0].price_id;
      const checkPlanType = plansMap.filter(plan => plan.priceId === priceId)
      planType = checkPlanType?.[0].id || null
    };
  const isBasicPlan = planType === 'basic'
  const isProPlan = planType === 'pro'

  return (
    <div>{isBasicPlan ? "yers" : isProPlan}</div>
  )
}

export default Dashboard