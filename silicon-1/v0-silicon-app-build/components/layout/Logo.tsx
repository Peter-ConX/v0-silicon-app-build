'use client'

import { useState } from 'react'
import Image from 'next/image'

export function Logo() {
  const [logoError, setLogoError] = useState(false)

  return (
    <div className="w-8 h-8 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white relative overflow-hidden">
      {!logoError ? (
        <img
          src="/silicon-logo.png"
          alt="Silicon"
          className="w-full h-full object-cover rounded-lg"
          onError={() => setLogoError(true)}
        />
      ) : (
        <span>S</span>
      )}
    </div>
  )
}
