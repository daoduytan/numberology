import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid'
import clsx from 'clsx'

export interface PaginationProps {
  total: number
  current: number
  size: number
  onChange: (value: number) => void
  showPageSize?: boolean
  align?: EPaginationAlign
  label?: string
}

export enum EPaginationAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

const Arrow = ({
  type,
  onClick,
  disabled,
}: {
  type: 'next' | 'prev'
  onClick: () => void
  disabled?: boolean
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick()
    }
  }
  const clsSizeIcon = 'h-5 w-5'
  const clsArrow = clsx(
    disabled
      ? 'text-slate-400'
      : 'text-slate-600 cursor-pointer hover:bg-blue-600 hover:text-white',

    'p-1 cursor-pointer rounded',
  )
  const icon =
    type === 'next' ? (
      <ChevronRightIcon className={clsSizeIcon} />
    ) : (
      <ChevronLeftIcon className={clsSizeIcon} />
    )

  return (
    <span className={clsArrow} onClick={handleClick}>
      {icon}
    </span>
  )
}
const DEFAULT_PAGE_SIZE = 15

export const Pagination = ({
  total,
  current,
  size = DEFAULT_PAGE_SIZE,
  onChange,
  showPageSize,
  label,
}: PaginationProps) => {
  const numberSize = Math.ceil(total / size)

  const isStart = current === 1
  const isEnd = current === numberSize

  const onPrev = () => {
    if (!isStart) {
      onChange(current - 1)
    }
  }
  const onNext = () => {
    if (!isEnd) {
      onChange(current + 1)
    }
  }

  return (
    <div className="flex gap-4 items-center ">
      {label && (
        <span className="text-sm font-medium text-slate-600">{label}</span>
      )}
      <div className="inline-flex gap-3 items-center p-1 border border-slate-300 rounded">
        <Arrow onClick={onPrev} type="prev" disabled={current === 1} />

        <span className="text-sm font-medium flex-1 text-slate-600">
          {current} / {numberSize}
        </span>

        <Arrow type="next" onClick={onNext} disabled={current === numberSize} />
      </div>
      {showPageSize && <PageSize />}
    </div>
  )
}

const pageSizeList: Array<{value: number; label: string}> = [
  {
    value: 10,
    label: '10 / trang',
  },
  {
    value: 25,
    label: '25 / trang',
  },
  {
    value: 50,
    label: '100 / trang',
  },
]

export const PageSize = () => {
  return (
    <select className="py-2 text-sm border text-slate-600 font-medium  border-slate-300 rounded">
      {pageSizeList.map(item => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
