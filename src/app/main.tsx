"use client"

import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader';
import { Home } from '@/components';

const App = () => {
  const [ load, setLoad ] = useState(true)

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setLoad(false)
        }, 2000)

        return () => clearTimeout(timeoutId)
    },[])
  return (
    load ?
    <Loader />
    :
    <main>
        <Home />
    </main>
  )
}

export default App