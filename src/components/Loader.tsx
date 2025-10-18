"use client"

import Image from 'next/image'
import React from 'react'
import { LOGO } from '@/images'

const Loader = () => {
  return (
    <main className={`flex w-full bg-[#e4e4e7] h-[100vh] items-center justify-center`}>
        <span className="bg-transparent animate-pulse">
          <Image 
            width={150} 
            height={100} 
            alt='Logo' 
            src={LOGO}
            priority
          />
        </span>
    </main>
  )
}

export default Loader