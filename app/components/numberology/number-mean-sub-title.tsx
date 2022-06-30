import type {ReactElement} from 'react'

interface Props {
  children: ReactElement | string
}
export const NumberMeanSubTitle = ({children}: Props) => {
  return <div className="font-medium text-xl">{children}</div>
}
