import type {IMonthNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IMonthNumberMean
  no?: string
}

export const MonthNumberMean = ({content, no}: Props) => {
  return (
    <div className="grid gap-4">
      <NumberMeanTitle>
        <>
          {no}. Số tháng: {content.title}
        </>
      </NumberMeanTitle>
      <ContentRenderMean content={content.content} />
    </div>
  )
}
