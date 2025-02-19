import { HeartIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <nav className="container flex items-center justify-between px-8 py-4 mx-auto">
        <Link href="/" className="transition-colors duration-200 text-gray-600 hover:text-red-500">
        <span className="flex items-center gap-2 shrink-0">
            <HeartIcon className="hover:rotate-12 transform transition duration-200 ease-in-out" />
            <span className="font-extrabold text-lg">LoveEasy</span>
        </span>
        </Link>
    </nav>
  )
}

export default Header