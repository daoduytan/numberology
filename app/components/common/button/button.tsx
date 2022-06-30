import clsx from 'clsx'
import * as React from 'react'

type TButtonVariant = 'contained' | 'dashed' | 'text' | 'default'

type TButtonSize = 'md' | 'lg' | 'sm'

type TButtonColor = 'danger' | 'primary'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  icon?: React.ReactNode
  rounded?: boolean
  variant?: TButtonVariant
  color?: TButtonColor
  size?: TButtonSize
  loading?: boolean
}

const classInline = 'inline-flex items-center justify-center'

const getClsSize = (size?: TButtonSize) => {
  switch (size) {
    case 'lg':
      return 'text-lg px-4 py-2'
    case 'sm':
      return 'text-sm px-2 py-1'
    default:
      return 'text-base px-3 py-1.5'
  }
}

const getClsType = (variant?: TButtonVariant): string => {
  switch (variant) {
    case 'dashed':
      return 'border border-dashed'

    case 'text':
      return ''

    default:
      return 'border'
  }
}

const getClsBg = ({
  variant,
  color,
  disabled,
  loading,
}: {
  variant?: TButtonVariant
  color?: TButtonColor
  disabled?: boolean
  loading?: boolean
}) => {
  if (loading) {
    if (color === 'primary') {
      return 'bg-blue-500 border-blue-500'
    }
    if (color === 'danger') {
      return 'bg-red-500 border-red-500'
    }
  }
  if (disabled) {
    if (variant === 'contained') {
      return 'bg-slate-400'
    }

    return ''
  }

  if (variant === 'contained') {
    if (color === 'danger') {
      return 'bg-red-600 hover:bg-red-500'
    }

    if (color === 'primary') {
      return 'bg-blue-600 hover:bg-blue-500'
    }

    return 'bg-white'
  }
  return ''
}

const getClsColor = ({
  color,
  variant,
  disabled,
  loading,
}: {
  color?: TButtonColor
  variant?: TButtonVariant
  disabled?: boolean
  loading?: boolean
}) => {
  if (loading) {
    if (variant === 'contained') {
      return 'text-white/90'
    }
    return ''
  }
  if (disabled) {
    if (variant === 'contained') {
      return 'border-slate-400 text-white'
    }

    if (variant === 'dashed') {
      return 'border-slate-400 text-slate-400'
    }

    return 'text-slate-500'
  }

  if (color === 'danger') {
    return clsx(
      variant === 'contained'
        ? 'text-white hover:text-slate-50'
        : 'text-red-600 hover:text-red-500',
      'border-red-600 hover:border-red-400',
    )
  }

  if (color === 'primary') {
    return clsx(
      variant === 'contained'
        ? 'text-white hover-text-slate-50'
        : 'text-blue-600 hover:text-blue-500',
      'border-blue-600 hover:border-blue-500',
    )
  }

  return 'border-slate-300'
}

export const Button = ({
  children,
  className,
  icon,
  variant,
  loading,
  disabled,
  rounded = true,
  color,
  size,
  ...props
}: Props) => {
  const clsRounded = rounded ? 'rounded' : ''
  const clsType = getClsType(variant)
  const clsSize = getClsSize(size)

  const clsColor = getClsColor({color, variant, disabled, loading})
  const clsBg = getClsBg({variant, color, disabled, loading})

  const classNameBtn = clsx(
    classInline,
    clsSize,
    clsColor,
    clsBg,
    clsType,
    clsRounded,
    className,
  )

  return (
    <button disabled={loading || disabled} className={classNameBtn} {...props}>
      <>
        {icon}
        {children && (
          <span className={clsx(icon ? 'ml-1' : '')}>{children}</span>
        )}
      </>
    </button>
  )
}
