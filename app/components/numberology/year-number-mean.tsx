import type {IYearNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IYearNumberMean
  no?: string
}

export const YearNumberMean = ({content, no}: Props) => {
  return (
    <div className="grid gap-4">
      <NumberMeanTitle>
        <>
          {no}. Số năm: {content.title}
        </>
      </NumberMeanTitle>
      <ContentRenderMean content={content.content} />
    </div>
  )
}
