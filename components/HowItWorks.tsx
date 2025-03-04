import { BrainIcon, MoveRight } from 'lucide-react'
import React from 'react'

type Props = {}

const HowItWorks = (props: Props) => {
  return (
    <section className="py-24 relative overflow-hidden">  
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
            <div
            style={{
                clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-pink-500 via-red-500 to-pink-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            />
            </div>
                <div className="flex items-center justify-center w-full pb-6">
                    <h2 className="font-bold text-xl uppercase mb-8 text-red-600">
                        How it works
                    </h2>
                </div>
                <h3 className="flex items-center justify-center mb-24 text-center font-bold">
                    Easily repurpose your content into SEO focused love stories
                </h3>

                <div className="flex items-center justify-center gap-4 lg:gap-24">
                    <div className="flex flex-col gap-4">
                        <p className="text-7xl text-center">🎥</p>
                        <p className='text-center font-medium'>Upload a Video</p>
                    </div>
                    <MoveRight size={64} strokeWidth={0.5} className="text-red-500" />

                    <div className="flex flex-col gap-4">
                        <p className="flex items-center justify-center">
                            <BrainIcon size={64} strokeWidth={0.5} />
                        </p>
                        <p className='text-center font-medium'>AI Magic ✨</p>
                    </div>

                    <MoveRight size={64} strokeWidth={0.5} className="text-red-500" />
                    <div className="flex flex-col gap-4">
                        <p className="text-7xl text-center">💌</p>
                        <p className='text-center font-medium'>Story</p>
                    </div>
                </div>
    </section>
  )
}

export default HowItWorks