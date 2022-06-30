import type { ReactElement } from 'react'

interface Props {
  children: ReactElement | string
}

export const NumberMeanTitle = ({ children }: Props) => {
  return <div className="text-3xl font-bold">{children}</div>
}
