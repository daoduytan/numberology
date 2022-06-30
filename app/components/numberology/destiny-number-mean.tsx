import type {IDestinyNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IDestinyNumberMean
}
export const DestinyNumberMean = ({content}: Props) => {
  return (
    <div className="grid gap-4" id="destinyNumber">
      <NumberMeanTitle>
        <>4. Số sứ mệnh: {content.title}</>
      </NumberMeanTitle>
      <ContentRenderMean content={content.mission} />

      <NumberMeanSubTitle>Tích cực</NumberMeanSubTitle>
      <ContentRenderMean content={content.positive} />

      <NumberMeanSubTitle>Tiêu cực</NumberMeanSubTitle>
      <ContentRenderMean content={content.negative} />

      <NumberMeanSubTitle>Lời khuyên</NumberMeanSubTitle>
      <ContentRenderMean content={content.advice} />
    </div>
  )
}
