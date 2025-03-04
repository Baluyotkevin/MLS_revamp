import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-200/20 flex h-20 py-24 px-12 z-20 relative overflow-hidden flex-col gap-2">
        <p className="">All Rights Reserved, {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer