import type {ReactNode} from 'react'
import {useRef} from 'react'

interface Props {
  children: ReactNode
}

export const GoTop = ({children}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const goTop = () => {
    console.log('2q3123132')
    console.log(ref.current)
    window.scrollTo(0, 0)
  }
  return (
    <div>
      <div ref={ref}>{children}</div>

      <div
        onClick={goTop}
        className="cursor-pointer fixed z-50 bottom-8 right-8 w-8 h-8 rounded-full"
      >
        Top
      </div>
    </div>
  )
}
