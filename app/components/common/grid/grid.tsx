import * as React from 'react'

interface Props {
  children: React.ReactNode
}

export const ContainerFluid = ({children}: Props) => (
  <div className="max-w-7xl mx-auto px-4">
    <>{children}</>
  </div>
)

export const Container = ({children}: Props) => (
  <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4">
    <>{children}</>
  </div>
)
