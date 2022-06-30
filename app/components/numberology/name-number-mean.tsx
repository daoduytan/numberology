import type {IMissingNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IMissingNumberMean
}

export const NameNumberMean = ({content}: Props) => {
  return (
    <div id="nameNumber" className="grid gap-4">
      <NumberMeanTitle>Chỉ số tên riêng</NumberMeanTitle>
      {content.map(item => {
        return (
          <div className="grid gap-4" key={item.title}>
            <NumberMeanSubTitle>{item.title}</NumberMeanSubTitle>
            <ContentRenderMean content={item.content} />
          </div>
        )
      })}
    </div>
  )
}
