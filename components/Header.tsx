import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <Link href={href} className="transition-colors duration-200 text-gray-600 hover:text-red-500">
      {children}
    </Link>
  )
}

const Header = () => {
  return (
    <nav className="container flex items-center justify-between px-8 py-4 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href="/">
          <span className="flex items-center gap-2 shrink-0">
              <Image 
                src="/favicon.ico"
                alt="LoveStory logo"
                width={32}
                height={32}
                className="hover:rotate-12 transform transition duration-200 ease-in-out"
              />
              <span className="font-extrabold text-lg">LoveStory</span>
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-2 lg:gap-12 lg:items-center">
        <NavLink href="/pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/posts">Your Story</NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        <div className="flex gap-2 items-center">
        <SignedIn>
          <NavLink href="/dashboard">Upload a Video</NavLink>
        </SignedIn>

        <SignedIn>
          <UserButton />
        </SignedIn>
        </div>

        <SignedOut>
          <SignInButton>
            <NavLink href="/sign-in">
              Sign In
            </NavLink>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  )
}

export default Header