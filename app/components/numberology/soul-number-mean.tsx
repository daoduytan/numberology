import type {ISoulNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: ISoulNumberMean
  no?: string
}
export const SoulNumberMean = ({content, no}: Props) => {
  return (
    <div className="grid gap-4">
      <NumberMeanTitle>
        <>
          {no}. Số linh hồn: {content.title}
        </>
      </NumberMeanTitle>
      <ContentRenderMean content={content.description} />

      <NumberMeanSubTitle>Tích cực</NumberMeanSubTitle>
      <ContentRenderMean content={content.positive} />

      <NumberMeanSubTitle>Tiêu cực</NumberMeanSubTitle>
      <ContentRenderMean content={content.negative} />

      <NumberMeanSubTitle>Lời khuyên</NumberMeanSubTitle>
      <ContentRenderMean content={content.advice} />
    </div>
  )
}
