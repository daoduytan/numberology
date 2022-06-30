import {UserIcon} from '@heroicons/react/solid'
import clsx from 'clsx'

interface Props {
  type?: 'circle' | 'rounded' | 'square'
  size?: string
  children?: React.ReactNode
}

export function Avatar({children, type = 'circle', size = 'h-5 w-5'}: Props) {
  const className = clsx(
    'p-2 inline-block bg-slate-400/20 hover:bg-slayte-400/30',
    'text-slate-500',
    type === 'circle' && 'rounded-full',
  )

  return (
    <span className={className}>
      {children ? children : <UserIcon className={size} />}
    </span>
  )
}
