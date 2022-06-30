import {ChevronDownIcon} from '@heroicons/react/solid'
import {Form, Link, useFetcher} from '@remix-run/react'
import {Avatar, DropDown, MenuItem} from '../common'

export function UserInfoDropdown() {
  const fetch = useFetcher()
  return (
    <DropDown
      placement="right"
      label={
        <span className="cursor-pointer flex items-center">
          <Avatar />
          <ChevronDownIcon className="h-5 w-5 ml-1 text-slate-400 hover:text-state-500" />
        </span>
      }
    >
      <div className="grid gap2">
        <MenuItem>
          <Link to="/dashboard">Profile</Link>
        </MenuItem>
        <fetch.Form method="post" action="/logout">
          <MenuItem>
            <button type="submit">Logout</button>
          </MenuItem>
        </fetch.Form>
      </div>
    </DropDown>
  )
}
