interface Props {
  data: Array<Array<number>>
}

const LIST_NUMBER: Array<number> = [3, 6, 9, 2, 5, 8, 1, 4, 7]

export const ChartDate = ({data}: Props) => {
  return (
    <div className="border w-72 h-72 grid grid-cols-3">
      {LIST_NUMBER.map(i => {
        return (
          <div
            key={i}
            className="relative border flex items-center justify-center"
          >
            <span className="font-serif text-6xl text-slate-200">{i}</span>
            <div className="absolute inset-0 flex items-center justify-center">
              {data[i - 1].map((n, idx) => (
                <span key={idx} className="text-2xl font-bold text-green-600">
                  {n}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
