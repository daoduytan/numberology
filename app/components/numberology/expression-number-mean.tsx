import type {IExpressionNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IExpressionNumberMean
  no?: string
}
export const ExpressionNumberMean = ({no, content}: Props) => {
  return (
    <div className="grid gap-4">
      <NumberMeanTitle>
        <>
          {no}. Số biểu đạt: {content.title}
        </>
      </NumberMeanTitle>

      <NumberMeanSubTitle>Tích cực</NumberMeanSubTitle>
      <ContentRenderMean content={content.positive} />

      <NumberMeanSubTitle>Tiêu cực</NumberMeanSubTitle>
      <ContentRenderMean content={content.negative} />

      <NumberMeanSubTitle>Lời khuyên</NumberMeanSubTitle>
      <ContentRenderMean content={content.advice} />
    </div>
  )
}
