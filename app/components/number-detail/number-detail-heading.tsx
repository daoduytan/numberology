interface Props {
  label: string
  number: string | number
}

export const NumberDetailHeading = ({label, number}: Props) => {
  return (
    <div className="font-serif font-bold text-5xl">
      {label}: {number}
    </div>
  )
}
