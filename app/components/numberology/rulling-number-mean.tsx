import type {IRulingNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IRulingNumberMean
  no?: string
}
export const RulingNumberMean = ({content, no}: Props) => {
  return (
    <div className="grid gap-4">
      <NumberMeanTitle>
        <>
          {no}. Con số chủ đạo: {content.title}
        </>
      </NumberMeanTitle>

      <NumberMeanSubTitle>Mục đích sống</NumberMeanSubTitle>
      <ContentRenderMean content={content.lifePurpose} />

      <NumberMeanSubTitle>Điều kiện phát triển</NumberMeanSubTitle>
      <ContentRenderMean content={content.conditionalDevelopment} />

      <NumberMeanSubTitle>Ưu điểm</NumberMeanSubTitle>
      <ContentRenderMean content={content.advantages} />

      <NumberMeanSubTitle>Nhược điểm</NumberMeanSubTitle>
      <ContentRenderMean content={content.defect} />

      <NumberMeanSubTitle>Đề xuất hướng phát triển</NumberMeanSubTitle>
      <ContentRenderMean content={content.suggestedDevelopment} />

      <NumberMeanSubTitle>Đề xuất nghề nghiệp</NumberMeanSubTitle>
      <ContentRenderMean content={content.careerSuggestions} />

      <NumberMeanSubTitle>Tóm lại</NumberMeanSubTitle>
      <ContentRenderMean content={content.conclusion} />
    </div>
  )
}
