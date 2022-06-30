import {UserInfoDropdown} from '../user-info-dropdown'

interface Props {
  children: React.ReactNode
  title?: string
}

export function AdminLayoutContent({children, title}: Props) {
  return (
    <div>
      <div className="flex justify-between">
        <div>{title}</div>
        <div>
          <UserInfoDropdown />
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}
