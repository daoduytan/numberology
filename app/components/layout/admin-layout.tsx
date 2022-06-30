import {UserIcon, ViewGridIcon} from '@heroicons/react/solid'
import {Link} from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import {Container} from '../common'

interface Props {
  children: React.ReactNode
}

const classIcon = clsx('h-5 w-5 mr-2')

const navigation = [
  {title: 'Tổng quan', path: '/admin', icon: <ViewGridIcon />},
  {title: 'Khách hàng', path: 'customer', icon: <UserIcon />},
]

export function AdminLayout({children}: Props) {
  return (
    <div className="flex">
      <div className="border-r border-grey-100 min-h-screen w-64">
        <div className="px-5 py-4">Logo</div>
        <div className="py-4">
          <ul>
            {navigation.map(item => (
              <li key={item.path} className="px-5 py-3">
                <Link className="flex items-center" to={item.path}>
                  {React.cloneElement(item.icon, {className: classIcon})}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 px-2 bg-slate-100">
        <Container>
          <>{children}</>
        </Container>
      </div>
    </div>
  )
}
