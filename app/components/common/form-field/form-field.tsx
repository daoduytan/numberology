import clsx from 'clsx'
import type {ReactElement} from 'react'
import {cloneElement} from 'react'

interface Props {
  label?: string
  required?: boolean
  error?: string
  children?: ReactElement
  titleClass?: string
}

export const FormField = ({
  label,
  required,
  error,
  children,
  titleClass,
}: Props) => {
  return (
    <fieldset>
      {label && (
        <label
          className={clsx(
            'block mb-2 font-medium text-sm',
            titleClass ? titleClass : '',
          )}
        >
          {label}
          {required && (
            <span className="text-red-600 text-xs ml-1 font-normal">*</span>
          )}
        </label>
      )}
      {children && cloneElement(children, {error})}
      {!!error && <span className="text-red-600 text-sm mt-1">{error}</span>}
    </fieldset>
  )
}
