import type {ReactNode} from 'react'

interface Props {
  children: ReactNode
}
export const Menu = ({children}: Props) => {
  return <div className="grid">{children}</div>
}
