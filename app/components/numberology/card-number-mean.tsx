import type {ReactElement} from 'react'
import {cloneElement} from 'react'

interface Props {
  no?: string
  id?: string
  children: ReactElement
}
export const CardNumberMean = ({no, id, children}: Props) => {
  return (
    <div className="grid gap-4" id={id}>
      {cloneElement(children, {no})}
    </div>
  )
}
