import BgGradient from '@/components/shared/bg-gradient';
import { Badge } from '@/components/ui/badge';
import UpgradeYourPlan from '@/components/UpgradeYourPlan';
import UploadForm from '@/components/UploadForm';
import { plansMap } from '@/lib/constants';
import { connectToDB } from '@/lib/database';
import { doesUserExist, getPlanType, hasCancelledSubscription, updateUser } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboard = async () => {

  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in')

  const email = clerkUser?.emailAddresses[0].emailAddress ?? ""
  const sql = await connectToDB();

  let userId = null;
  let priceId = null;

  const hasUserCancelled = await hasCancelledSubscription(sql, email);

  const user = await doesUserExist(sql, email);

  if (user) {
      userId = clerkUser?.id;

      if (userId) await updateUser(sql, userId, email);

      priceId = user[0].price_id;
    };

  const { id: planTypeId = "starter", name: planTypeName } = await getPlanType(priceId);



  const isBasicPlan = planTypeId === 'basic';
  const isProPlan = planTypeId === 'pro';

  return (
    <BgGradient>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Badge className="bg-gradient-to-r from-red-700 to-pink-800 text-white px-4 py-1 text-lg font-semibold capitalize">{planTypeName} Plan</Badge>

          <h2 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Start creating amazing content
          </h2>

          <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
            Upload your audio or video file and let our AI do the magic!
          </p>

          <p className="mt-2 text-lgleading-8 text-gray-600 max-w-2xl text-center sm:text-4xl ">
            You get{" "}
            <span className="font-bold text-pink-600 bg-red-100 px-2 py-1 rounded-md">{isBasicPlan ? '3' : "Unlimited"} blog posts
            </span> 
            as part of the{" "}
            <span className="font-bold capitalize">
            {planTypeName}{" "}
            </span>
            Plan.
          </p>

          {hasUserCancelled 
          ? 
          <UpgradeYourPlan /> 
          : (
            <BgGradient>
              <UploadForm />
            </BgGradient>
          )}
        </div>
      </div>
    </BgGradient>
  )
}

export default Dashboard