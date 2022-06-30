import type {LoaderFunction} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'
import {Outlet} from '@remix-run/react'
import {ProfileLayout} from '~/components'
import {getUser} from '~/utils/auth.server'

export const loader: LoaderFunction = async ({request}) => {
  const user = await getUser(request)
  if (!user) {
    return redirect('/login')
  }

  return json(user)
}

export default function Dashboard() {
  return (
    <ProfileLayout>
      <Outlet />
    </ProfileLayout>
  )
}
