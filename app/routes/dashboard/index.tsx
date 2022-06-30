import {Outlet} from '@remix-run/react'
import {useAuth} from '~/context'

export default function Dashboard() {
  const {user} = useAuth()

  return (
    <div>
      <Outlet />
      {JSON.stringify(user)}
    </div>
  )
}
