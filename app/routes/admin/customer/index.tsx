import type {User} from '@prisma/client'
import {useLoaderData} from '@remix-run/react'
import {prisma} from '~/utils/prisma.server'

export const loader = async () => {
  return await prisma.user.findMany({
    where: {
      role: 'USER',
    },
  })
}
export default function Customer() {
  const data = useLoaderData()
  console.log({data})
  return (
    <div>
      Custmer
      <div>
        {data.map((item: User) => (
          <div key={item.id}>{item.fullname}</div>
        ))}
      </div>
    </div>
  )
}
