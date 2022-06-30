import {Outlet} from '@remix-run/react'
import {AdminLayout} from '~/components'

export default function Admin() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
