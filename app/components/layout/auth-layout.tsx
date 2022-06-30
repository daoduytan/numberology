import type {ReactNode} from 'react'
import {Container} from '../common'
import {Footer} from '../footer'
import {Header} from '../header'

interface Props {
  children: ReactNode
}

export const AuthLayout = ({children}: Props) => {
  return (
    <div className="relative">
      <Header fixed={false} />

      <div className="min-h-screen">
        <Container>
          <div className="flex items-center justify-center pt-48 pb-24">
            {children}
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  )
}
