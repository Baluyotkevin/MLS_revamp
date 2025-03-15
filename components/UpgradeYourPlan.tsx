import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const UpgradeYourPlan = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center border-2 border-red-200 bg-red-100 p-4 rounded-lg border-dashed">
            You need to upgrade to the Basic Plan or the Pro Plan to create a love story with the power of AI ᢉ𐭩
        </div>
        <Link href="/#pricing" className="flex gap-2 items-center text-center text-red-600 font-semibold">
            Go to Pricing <ArrowRight />
        </Link>
    </div>
  )
}

export default UpgradeYourPlan