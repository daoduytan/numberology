import type {
  IOwnArrowOrMissArrow,
  IRepeatNumberMean,
  ISummaryMean,
} from '~/utils/pythagoras'
import {CardNumberMean} from './card-number-mean'
import {ContentRenderMean} from './content-render-mean'
import {NumberMeanSubTitle} from './number-mean-sub-title'
import {NumberMeanTitle} from './number-mean-title'

interface OwnArrowMeanProps {
  content: IOwnArrowOrMissArrow[]
  title: string
}

const ArrowMean = ({content, title}: OwnArrowMeanProps) => {
  return (
    <div className="grid gap-4">
      <NumberMeanSubTitle>{title}</NumberMeanSubTitle>
      {content.map((item, key) => {
        return (
          <div key={item.key} className="grid gap-2">
            <div className="font-medium">
              {key + 1}. {item.title} ({item.key})
            </div>
            <ContentRenderMean content={item.content} />
          </div>
        )
      })}
    </div>
  )
}

interface RepeatNumberProps {
  content: IRepeatNumberMean[]
}

const RepeatNumberMean = ({content = []}: RepeatNumberProps) => {
  return (
    <div className="grid gap-4">
      <NumberMeanSubTitle>Con số lặp lại</NumberMeanSubTitle>
      {content.map((item, key) => {
        if (!item) {
          return <div key={key}></div>
        }
        return (
          <div key={item.title} className="grid gap-2">
            <div className="font-medium">
              {key + 1}. {item.title}
            </div>
            <ContentRenderMean content={item.content} />
          </div>
        )
      })}
    </div>
  )
}

interface Props {
  content: ISummaryMean
}

export const SumaryMean = ({content}: Props) => {
  console.log({content})
  return (
    <CardNumberMean id="summary">
      <>
        <NumberMeanTitle>Biểu đồ tổng hợp</NumberMeanTitle>

        <ArrowMean content={content.ownArrow} title="Mũi tên sở hữu" />

        <hr />
        <ArrowMean content={content.missArrow} title="Mũi tên thiếu" />

        <hr />
        <RepeatNumberMean content={content.repeatNumber} />
      </>
    </CardNumberMean>
  )
}
