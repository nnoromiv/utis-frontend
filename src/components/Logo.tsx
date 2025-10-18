"use client"

import { LOGO, SMALL_LOGO } from "@/images"
import Image from "next/image"

export const Logo = () => {
  return (
    <Image
      width={150}
      height={30}
      alt='Logo'
      src={LOGO}
      priority
    />)
}

export const SmallLogo = () => {
  return (
    <Image
      width={150}
      height={30}
      alt='Logo'
      src={SMALL_LOGO}
      priority
    />)
}