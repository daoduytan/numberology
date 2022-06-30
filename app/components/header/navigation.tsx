import {Link} from '@remix-run/react'
import clsx from 'clsx'
import {useAuth} from '~/context'
import {Button} from '../common'
import {UserInfoDropdown} from '../user-info-dropdown'

const classMenuItem = clsx('ml-10')

const MenuUser = () => {
  const {user, loading} = useAuth()

  if (loading) return <></>

  return (
    <li className={classMenuItem}>
      {user ? (
        <UserInfoDropdown />
      ) : (
        <Link to="/login">
          <Button color="primary" variant="contained">
            Đăng nhập
          </Button>
        </Link>
      )}
    </li>
  )
}

const menus = [
  {
    label: 'Trang chủ',
    path: '/',
  },
  {
    label: 'Tra cứu',
    path: '/search',
  },
  {
    label: 'Kiến thức',
    path: '/blog',
  },
]

export const Navigation = () => {
  return (
    <nav>
      <ul className="flex items-center">
        {menus.map(item => (
          <li key={item.path} className={classMenuItem}>
            <Link className="font-medium text-base" to={item.path}>
              {item.label}
            </Link>
          </li>
        ))}
        <MenuUser />
      </ul>
    </nav>
  )
}
