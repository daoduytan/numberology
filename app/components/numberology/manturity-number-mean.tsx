import type {IManturityNumberMean} from '~/utils/pythagoras'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanTitle} from './number-mean-title'

interface Props {
  content: IManturityNumberMean
  no?: string
}

export const ManturityNumberMean = ({content, no}: Props) => {
  return (
    <div className="grid gap-4" id="maturityNumber">
      <NumberMeanTitle>
        <>
          {no}. Số trưởng thành: {content.title}
        </>
      </NumberMeanTitle>

      <ContentRenderMean content={content.content} />
    </div>
  )
}
