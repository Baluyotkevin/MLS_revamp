import BgGradient from '@/components/shared/bg-gradient'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="flex justify-center items-center py-16">
      <BgGradient>
        <SignIn />
      </BgGradient>
    </section>
  )
};