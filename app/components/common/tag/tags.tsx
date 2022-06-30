import {XIcon} from '@heroicons/react/solid'
import clsx from 'clsx'

type TTagColor = 'primary' | 'danger' | 'warning' | 'success'
type TTagSize = 'sm' | 'md' | 'lg'

interface Props {
  label: string
  close?: boolean
  color?: TTagColor
  size?: TTagSize
  rounded?: boolean
  onClick?: () => void
}

const getClsSizeTag = (size?: TTagSize) => {
  if (size === 'sm') {
    return 'px-1 py-0.5 text-xs'
  }
  if (size === 'lg') {
    return 'px-5 py-1.5 text-lg'
  }
  return 'px-3 py-1 text-sm'
}

// get bg
const getClsBgTag = (color?: TTagColor) => {
  if (color === 'primary') {
    return 'bg-blue-600 hover:bg-blue-500 border-blue-600 hover:border-blue-500'
  }

  if (color === 'danger') {
    return 'bg-red-600 hover:bg-red-500 border-red-600 hover:border-red-500'
  }

  if (color === 'success') {
    return 'bg-green-600 hover:bg-green-500 border-green-600 hover:border-green-500'
  }
  if (color === 'warning') {
    return 'bg-orange-600 hover:bg-orange-500 border-orange-600 hover:border-orange-500'
  }

  return 'bg-white border-slate-300'
}
// color
const getClsColorTag = (color?: TTagColor) => {
  if (color) {
    return 'text-white'
  }

  return 'text-slate-600'
}

export const Tag = ({
  label,
  close,
  color,
  size,
  onClick,
  rounded = true,
}: Props) => {
  const clsBg = getClsBgTag(color)
  const clsColor = getClsColorTag(color)
  const clsSize = getClsSizeTag(size)

  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <span onClick={handleClick}>
      <span
        className={clsx(
          clsBg,
          clsColor,
          onClick ? 'cursor-pointer' : '',
          rounded ? 'rounded-full' : 'rounded',
          'inline-flex items-center border overflow-hidden',
        )}
      >
        <span
          className={clsx(clsSize, 'inline-block flex-1 text-sm px-3 py-1')}
        >
          {label}
        </span>
        {close && (
          <i className="h-full pr-1 flex items-center">
            <XIcon className="h-3 h-3" />
          </i>
        )}
      </span>
    </span>
  )
}
