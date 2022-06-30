import type {MemberCustomer} from '@prisma/client'
import {Link} from '@remix-run/react'
import moment from 'moment'
import {Avatar} from '../avatar'
import {Button} from '../button'

interface Props {
  member: MemberCustomer
}

export const MemberItem = ({member}: Props) => {
  return (
    <div className=" bg-white grid gap-4 border rounded">
      <div className="p-4 grid gap-2 items-center text-center justify-center">
        <div className="">
          <Avatar>1</Avatar>
        </div>
        <div className="text-lg">{member.fullname}</div>

        <div className="text-sm">
          {moment(member.birthday).format('DD/MM/YYYY')}
        </div>

        <div className="pt-2">
          Ruling number: <br />
          <span className="font-serif text-4xl">8</span>
        </div>
      </div>

      <div className="border-t border-t-slate-200 p-2 flex gap-4 items-center justify-center">
        <Link to={`${member.id}`}>
          <Button className="text-sm rounded px-3 py-1">Detail</Button>
        </Link>
        <Link to={`${member.id}/edit`}>
          <Button variant="outline" className="text-sm rounded px-3 py-1">
            Edit
          </Button>
        </Link>
        <Link to={`${member.id}/delete`}>
          <Button variant="outline" className="text-sm rounded px-3 py-1">
            Remove
          </Button>
        </Link>
      </div>
    </div>
  )
}
