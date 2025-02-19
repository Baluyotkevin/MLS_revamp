import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <section className="z-0 items-center justify-center py-28 sm:pt-32 transition-all animate-in lg:max-w-6xl mx-auto flex flex-col">
        <h1 className="py-6 text-center">Turn your words into <span className="underline-offset-8 underline decoration-dashed decoration-red-200">captivating</span>{" "}love stories</h1>
        <h2 className="text-center px-4 lg:px-0 lg:max-w-4xl">
            Convert your video or voice into a love story in seconds with the power of AI!
        </h2>

        <Button variant={'link'}
            className="mt-6 text-xl rounded-full px-12 py-8 lg:mt-20 bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-bold shadow-lg hover:no-underline"
        >
            <Link href="/#pricing" className="flex gap-2 items-center">
                Get LoveEasy 
                <ArrowRight className="animate-pulse" />
            </Link>
        </Button>
    </section>
  )
}

export default Banner;