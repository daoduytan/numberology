import type {MemberCustomer} from '@prisma/client'
import {MemberItem} from './member-item'

interface Props {
  data: MemberCustomer[]
}
export const MemberList = ({data}: Props) => {
  return (
    <div className="grid grid-cols-4 xl:grid-cols-5 gap-8">
      {data.map(item => (
        <MemberItem key={item.id} member={item} />
      ))}
    </div>
  )
}
