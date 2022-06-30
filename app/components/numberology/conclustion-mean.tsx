import type {IConclusionMean} from '~/utils/pythagoras'
import {CardNumberMean} from './card-number-mean'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IConclusionMean
}

export const Conclusion = ({content}: Props) => {
  return (
    <CardNumberMean id="conclution" no="">
      <>
        <NumberMeanTitle>
          <>Tóm tắt đặc điểm cá nhân qua số chủ đạo: {content.title}</>
        </NumberMeanTitle>

        {content.content.map(item => {
          return (
            <div key={item.title} className="grid gap-2">
              <NumberMeanSubTitle>{item.title}</NumberMeanSubTitle>
              <ContentRenderMean content={item.content} />
            </div>
          )
        })}
      </>
    </CardNumberMean>
  )
}
