import * as React from 'react'
import {Footer} from '../footer'
import {Header} from '../header'

interface Props {
  children: React.ReactNode
}

function BaseLayout({children}: Props) {
  return (
    <div className="relative">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export {BaseLayout}
