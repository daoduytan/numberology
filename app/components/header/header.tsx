import clsx from 'clsx'
import {useEffect, useState} from 'react'
import {ContainerFluid} from '../common'
import {Logo} from '../logo'
import {Navigation} from './navigation'

const TOP_OFFSET = 100

interface Props {
  fixed?: boolean
}
export const Header = ({fixed}: Props) => {
  const [top, setTop] = useState<number>(0)

  useEffect(() => {
    function handleScroll() {
      setTop(window.scrollY)
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isFixed = fixed ? top > TOP_OFFSET : false

  const className = clsx(
    isFixed ? 'fixed py-6 bg-white/95' : 'absolute py-8',
    'inset-x-0',
    'top-0',
    'z-50',
    'transition-all',
  )

  return (
    <header className={className}>
      <ContainerFluid>
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation />
        </div>
      </ContainerFluid>
    </header>
  )
}
