import type {TContentMean} from '~/utils/pythagoras'

interface Props {
  content: TContentMean
}

export const ContentRenderMean = ({content = []}: Props) => {
  return (
    <div className="grid gap-4">
      {content.map((item, index) => {
        if (typeof item === 'string') return <p key={index}>{item}</p>
        return (
          <ul key={index} className="grid gap-1 list-disc list-inside">
            {item.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}
