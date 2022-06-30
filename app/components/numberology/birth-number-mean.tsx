import type {IBirthNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IBirthNumberMean
  no?: string
}
export const BirthNumberMean = ({content, no}: Props) => {
  return (
    <div className="grid gap-4">
      <NumberMeanTitle>
        <>
          {no}. Số ngày sinh: {content.title}
        </>
      </NumberMeanTitle>
      <ContentRenderMean content={content.content} />
    </div>
  )
}
