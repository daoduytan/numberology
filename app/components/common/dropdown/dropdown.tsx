import clsx from 'clsx'
import type {ReactElement} from 'react'
import {cloneElement, useCallback, useRef, useState} from 'react'
import {useOnClickOutside} from '~/hook'

type TDropdownPlacement = 'left' | 'right'

interface Props {
  label: ReactElement
  children?: ReactElement
  placement?: TDropdownPlacement
}

const clsDefault = 'absolute top-full py-2 w-min z-2'

const getClsPlacement = (placement: TDropdownPlacement) => {
  if (placement === 'right') {
    return 'right-0'
  }

  return 'left-0'
}

export const DropDown = ({label, children, placement = 'left'}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const toggle = useCallback(() => setOpen(o => !o), [])
  const clsPlacement = getClsPlacement(placement)

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <>
      <div ref={ref} className={clsx(open ? 'relative' : '', 'inline-block')}>
        {cloneElement(label, {
          onClick: toggle,
          className: clsx(label.props.className, 'cursor-pointer'),
        })}
        {open && (
          <div className={clsx(clsDefault, clsPlacement)}>
            <div
              className={clsx('rounded bg-white border border-slate-300 py-2')}
            >
              {children}
              {/* {children && cloneElement(children, {onClick: toggle})} */}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

type TMenuItemVariant =
  | 'danger'
  | 'success'
  | 'default'
  | 'warning'
  | 'disabled'

interface MenuItemProps {
  children: ReactElement
  variant?: TMenuItemVariant
}
const getClsBgMenuItem = (variant?: TMenuItemVariant) => {
  if (variant === 'success') {
    return 'bg-green-400'
  }
  return 'bg-white hover:bg-slate-100'
}

export const MenuItem = ({children, variant}: MenuItemProps) => {
  const clsbg = getClsBgMenuItem(variant)
  return cloneElement(children, {
    className: clsx(clsbg, 'px-3 py-1 whitespace-nowrap block'),
  })
}
