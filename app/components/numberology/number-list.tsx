import clsx from 'clsx'
import {isArray} from 'lodash'
import type {INumber} from '~/utils/pythagoras'
import {ETypeNumber} from '~/utils/pythagoras'

interface Props {
  numberList: Array<INumber>
}

interface NumberItemProps {
  item: INumber
}

const NumberItem = ({item}: NumberItemProps) => {
  const clsWrap = clsx(
    item.color,
    'px-6',
    'py-2',
    'text-white',
    'rounded',
    'mt-2',
  )
  const renderValue = () => {
    if (isArray(item.value)) {
      if (item.value.length === 0) return 'Không có'
      return item.value.join(', ').trim()
    }

    return item.value
  }

  return (
    <a href={`#${item.type}`} className="text-center">
      <span className="text-base">{item.title}</span>
      <div className={clsWrap}>
        <span className="bold text-3xl font-serif block">{renderValue()}</span>
      </div>
    </a>
  )
}

export const NumberList = ({numberList}: Props) => {
  return (
    <div className="grid grid-cols-5 gap-8 py-6">
      {numberList.map(item => {
        return <NumberItem key={item.type} item={item} />
      })}
    </div>
  )
}
