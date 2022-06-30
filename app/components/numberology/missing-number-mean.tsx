import type {IMissingNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IMissingNumberMean
  no?: string
}

export const MissingNumberMean = ({content, no}: Props) => {
  const renderContent = () => {
    if (content.length === 0) {
      return <p>Không có chỉ số thiếu</p>
    }

    return content.map(item => {
      return (
        <div className="grid gap-4" key={item.title}>
          <NumberMeanSubTitle>{item.title}</NumberMeanSubTitle>
          <ContentRenderMean content={item.content} />
        </div>
      )
    })
  }

  return (
    <div className="grid gap-4">
      <NumberMeanTitle>
        <>{no}. Chỉ số thiếu</>
      </NumberMeanTitle>
      {renderContent()}
    </div>
  )
}
