import {get} from 'lodash'
import type {IThreeStageMean, TContentMean} from '~/utils/pythagoras'
import {CardNumberMean} from './card-number-mean'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IThreeStageMean
}

const stageTitle: {[n: string]: string} = {
  stage1: 'Giai đoạn tuổi trẻ',
  stage2: 'Giai đoạn trường thành',
  stage3: 'Giai đoạn viên mãn',
}

export const ThreeStageMean = ({content}: Props) => {
  return (
    <CardNumberMean id="threeStage">
      <>
        <NumberMeanTitle>3 giai đoạn cuộc đời</NumberMeanTitle>

        {Object.keys(content).map(key => {
          const item: {title: string; content: TContentMean} = get(content, key)

          return (
            <div className="grid gap-2" id={key} key={key}>
              <NumberMeanSubTitle>
                <>
                  {stageTitle[key]}: {item.title}
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
