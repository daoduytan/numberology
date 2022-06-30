import type { IAttitudeNumberMean } from '~/utils/pythagoras'
import { ContentRenderMean } from './content-render-mean'
import { NumberMeanTitle } from './number-mean-title'

interface Props {
	content: IAttitudeNumberMean
}
export const AttitudeNumberMean = ({ content }: Props) => {
	return (
		<div className="grid gap-4" id="attitudeNumber">
			<NumberMeanTitle>
				<>5. Số thái độ: {content.title}</>
			</NumberMeanTitle>
			<ContentRenderMean content={content.content} />

		</div>
	)
}
