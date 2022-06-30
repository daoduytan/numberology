import type {ReactNode} from 'react'

interface Props {
  title?: string
  extra?: ReactNode
}

export const DashboardHeading = ({title, extra}: Props) => {
  return (
    <div className="flex items-center justify-between px-10 py-4 bg-white/60 border-b broder-b-slate-400">
      <div className="text-2xl">{title}</div>
      <div>{extra}</div>
    </div>
  )
}
