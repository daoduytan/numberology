import {XIcon} from '@heroicons/react/solid'
import clsx from 'clsx'
import type {ReactNode} from 'react'

type TModalSize = 'md' | 'lg' | 'xl' | 'screen-md'
interface Props {
  callback: () => void
  children: ReactNode
  size?: TModalSize
  heading?: ReactNode
}

const getClsContentModal = (size?: TModalSize): string => {
  switch (size) {
    case 'lg':
      return 'max-w-lg'

    case 'xl':
      return 'max-w-xl'

    case 'md':
      return 'max-w-md'
    case 'screen-md':
      return 'max-w-screen-md'

    default:
      return 'max-w-7xl'
  }
}

export const Modal = ({callback, children, size, heading}: Props) => {
  const clsContenModalSize = getClsContentModal(size)

  return (
    <div className="fixed inset-0">
      <div style={{overflowY: 'auto'}} className="relative h-screen">
        <div className="py-16 relative min-h-screen">
          <div
            onClick={callback}
            className="cursor-pointer fixed inset-0 z-1 bg-slate-400/50"
          />
          <div className={clsx(clsContenModalSize, 'mx-auto')}>
            <div className="bg-white relative z-10 rounded">
              {heading}
              <div className="p-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ModalHeadingProps {
  title: string
  extra?: ReactNode
  onClose?: () => void
}
export const ModalHeading = ({title, extra, onClose}: ModalHeadingProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-300">
      <div className="text-xl font-medium">{title}</div>
      <div>
        {extra || (
          <XIcon
            className="h-5 w-5 cursor-pointer text-slate-600 hover:text-orange-600"
            onClick={onClose}
          />
        )}
      </div>
    </div>
  )
}
