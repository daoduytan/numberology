import clsx from 'clsx'
import type {CSSProperties, ReactNode} from 'react'
import {useMemo} from 'react'
import type {PaginationProps} from '../pagination'

export enum ETableAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

interface ColumnType<IColumnData> {
  title?: string
  dataIndex: keyof IColumnData | string
  render?: (
    value: IColumnData[keyof IColumnData],
    root: IColumnData,
  ) => ReactNode
  align?: ETableAlign
  width?: number
}

export interface ColumnsType<IColumnData>
  extends Array<ColumnType<IColumnData>> {}

interface Props<T> {
  data: any[] // TODO fix type
  columns: ColumnsType<T>
  rowKey: string
  hasNumberOrder?: boolean
  pagination?: PaginationProps
}

const DEFAULT_WIDTH_NO = 60

const getClassAlign = (align?: ETableAlign): string => {
  switch (align) {
    case ETableAlign.Right:
      return 'text-right'
    case ETableAlign.Center:
      return 'text-center'
    default:
      return 'text-left'
  }
}

export const Table = <T extends object>({
  rowKey,
  data,
  columns,
  hasNumberOrder = true,
}: Props<T>) => {
  const clsSpace = 'px-4 py-4'

  const clsTh = 'text-xs text-slate-500 font-medium uppercase'

  const renderHead = useMemo(
    () => (
      <thead className="bg-slate-100 border-b border-slate-200">
        {hasNumberOrder && (
          <th
            className={clsx(clsSpace, clsTh, 'text-left')}
            style={{width: DEFAULT_WIDTH_NO}}
          >
            STT
          </th>
        )}
        {columns.map(item => (
          <th
            key={item.dataIndex.toString()}
            className={clsx(clsSpace, clsTh, getClassAlign(item.align))}
          >
            {item.title}
          </th>
        ))}
      </thead>
    ),
    [columns, hasNumberOrder],
  )

  const renderBody = () => {
    if (data.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length + 1}>
              <div className="text-center py-10">
                <p>Không tìm thấy dữ liệu</p>
              </div>
            </td>
          </tr>
        </tbody>
      )
    }

    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={item[rowKey]} className="border-b border-slate-200">
            {hasNumberOrder && (
              <td
                className={clsx('text-left', clsSpace)}
                style={{width: DEFAULT_WIDTH_NO}}
              >
                {index + 1}
              </td>
            )}
            {columns.map(col => {
              const value = item[col.dataIndex]
              const style: CSSProperties = {}

              if (col.width) {
                style.width = col.width
              }
              return (
                <td
                  style={style}
                  className={clsx(getClassAlign(col.align), clsSpace)}
                  key={col.dataIndex.toString()}
                >
                  {col.render ? col.render(value, item) : value}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <table className="w-full border-b border-b-slate-200">
      {renderHead}
      {renderBody()}
    </table>
  )
}
