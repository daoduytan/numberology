import type {IChallengeMean} from '~/utils/pythagoras'
import {CardNumberMean} from './card-number-mean'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IChallengeMean
}

export const ChallengeMean = ({content}: Props) => {
  return (
    <CardNumberMean id="challenge">
      <>
        <NumberMeanTitle>Biểu đồ thử thách</NumberMeanTitle>
        {content.map(item => {
          return (
            <div key={item.title} className="grid gap-2">
              <NumberMeanSubTitle>
                <>
                  {item.peak}: {item.title}
                </>
              </NumberMeanSubTitle>
              <ContentRenderMean content={item.content} />
            </div>
          )
        })}
      </>
    </CardNumberMean>
  )
}
