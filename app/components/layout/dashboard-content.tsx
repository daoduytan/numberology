import type {ReactNode} from 'react'
import {DashboardHeading} from './dashboard-heading'

interface Props {
  headingTitle?: string
  headingExtra?: ReactNode
  children: ReactNode
}

export const DashboardContent = ({
  headingTitle,
  headingExtra,
  children,
}: Props) => {
  return (
    <div>
      <DashboardHeading title={headingTitle} extra={headingExtra} />
      <div className="py-6 px-10">{children}</div>
    </div>
  )
}
