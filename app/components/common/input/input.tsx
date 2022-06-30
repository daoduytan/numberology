import {EyeIcon, EyeOffIcon} from '@heroicons/react/solid'
import clsx from 'clsx'
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import {useState} from 'react'

type TInputSize = 'sm' | 'md' | 'lg'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  block?: boolean
  error?: boolean
  rounded?: boolean
  inputSize?: TInputSize
}

const clsBorderInput = 'border border-slate-300'
const getSizeInput = (size?: TInputSize): string => {
  switch (size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs'
    case 'lg':
      return 'px-5 py-2.5 text-base'
    default:
      return 'px-4 py-2 txt-sm'
  }
}

const clsBlockInput = (block?: boolean) => {
  return block ? 'block w-full' : ''
}
const clsErrorInput = (error?: boolean) =>
  error
    ? 'border-red-600 bg-red-100 focus:border-red-500'
    : 'focus:border-slate-400'

export const Input = ({
  block,
  error,
  rounded = true,
  type = 'text',
  inputSize,
  ...props
}: Props) => {
  const [isPassword, setIsPassword] = useState<boolean>(type === 'password')

  const clsSize = getSizeInput(inputSize)

  const classNameInput = clsx(
    clsBorderInput,
    clsSize,
    clsErrorInput(error),
    clsBlockInput(block),
    rounded ? 'rounded' : '',
  )

  const togglePassword = () => {
    setIsPassword(v => !v)
  }

  const clsEye = 'h-4 w-4'

  return (
    <div className="relative">
      <input
        type={isPassword ? 'password' : type === 'password' ? 'text' : type}
        className={classNameInput}
        {...props}
      />

      {type === 'password' && (
        <span
          className="absolute right-3.5 top-3.5 cursor-pointer text-slate-600"
          onClick={togglePassword}
        >
          {isPassword ? (
            <EyeIcon className={clsEye} />
          ) : (
            <EyeOffIcon className={clsEye} />
          )}
        </span>
      )}
    </div>
  )
}

// select
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  block?: boolean
  error?: boolean
  children?: ReactNode
  label?: string
  rounded?: boolean
}

export const Select = ({
  block,
  error,
  label,
  children,
  value = '',
  onChange,
  rounded = true,
  ...props
}: SelectProps) => {
  const [localValue, setLocalValue] = useState<any>(props.defaultValue)
  const clsColor = localValue && localValue !== '' ? '' : 'text-slate-500'

  return (
    <select
      className={clsx(
        clsBorderInput,
        clsColor,
        rounded ? 'rounded' : '',
        'text-sm py-2',
        clsErrorInput(error),
        clsBlockInput(block),
      )}
      {...props}
    >
      {label && (
        <option disabled selected value="">
          {label}
        </option>
      )}
      {children}
    </select>
  )
}

// checkbox

export const Checkbox = (props: Props) => {
  return <input type="checkbox" {...props} className={clsx(clsBorderInput)} />
}

// text area
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  block?: boolean
  error?: boolean
  rounded?: boolean
}

export const TextArea = ({
  rounded = true,
  block,
  error,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      className={clsx(
        clsBorderInput,
        rounded ? 'rounded' : '',
        'text-sm',
        clsBlockInput(block),
        clsErrorInput(error),
      )}
      {...props}
    />
  )
}
