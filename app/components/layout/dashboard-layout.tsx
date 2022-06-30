import {
  MenuIcon,
  UserGroupIcon,
  UserIcon,
  ViewGridIcon,
} from '@heroicons/react/outline'
import {NavLink} from '@remix-run/react'
import clsx from 'clsx'
import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'
import {Logo} from '../logo'
import {UserInfoDropdown} from '../user-info-dropdown'

// context
enum ETypes {
  Toggle = 'dashboard/toggle',
}
interface IState {
  open: boolean
}
interface IAction {
  type: ETypes
  payload?: any
}
const initialState: IState = {
  open: true,
}

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ETypes.Toggle:
      return {
        ...state,
        open: action.payload,
      }
    default:
      return state
  }
}
interface IContext {
  state: IState
  dispatch: React.Dispatch<any>
}

const initialContext = {
  state: initialState,
  dispatch: () => {},
}

const Context = createContext<IContext>(initialContext)

interface DashboardContentProps {
  children: ReactNode
}

const DashboardContext = ({children}: DashboardContentProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({state, dispatch}), [state, dispatch])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

const useDashoardContext = () => {
  const {state, dispatch} = useContext(Context)
  const toggle = useCallback((value: boolean) => {
    dispatch({
      type: ETypes.Toggle,
      payload: value,
    })
  }, [])
  return {...state, toggle}
}

const menus: Array<{icon: ReactElement; to: string; label: string}> = [
  {
    icon: <ViewGridIcon />,
    to: '/dashboard',
    label: 'Tổng quan',
  },
  {
    icon: <UserIcon />,
    to: 'member',
    label: 'Thành viên',
  },

  {
    icon: <UserGroupIcon />,
    to: 'group',
    label: 'Nhóm',
  },
]

const Navigation = () => {
  const {open} = useDashoardContext()

  return (
    <ul className="grid gap-2">
      {menus.map(item => {
        return (
          <li key={item.to}>
            <NavLink end to={item.to} className="block">
              {({isActive}) => {
                return (
                  <span
                    className={clsx(
                      isActive
                        ? 'text-blue-600 bg-slate-100 '
                        : 'text-slate-600',
                      'p-2 block hover:text-blue-600 rounded hover:bg-slate-100 flex items-center gap-4 text-sm font-medium',
                    )}
                  >
                    {cloneElement(item.icon, {className: 'h-6 w-6'})}
                    {open && item.label}
                  </span>
                )
              }}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}

const MenuToggle = () => {
  const {toggle, open} = useDashoardContext()

  const handleClick = () => {
    toggle(!open)
  }
  return <MenuIcon className="h-5 w-5 cursor-pointer" onClick={handleClick} />
}

const Sider = () => {
  const {open} = useDashoardContext()
  const clsNav = clsx(
    open ? 'w-64' : 'w-14',
    'h-screen bg-white border-r border-slate-200 overflow-hidden transition-all',
  )
  return (
    <div className={clsNav}>
      <div className="flex items-center justify-between px-4 h-14 border-b border-b-slate-200">
        <Logo />
      </div>
      <div className="px-2 py-4">
        <Navigation />
      </div>
    </div>
  )
}

interface Props {
  children: ReactNode
}

export const ProfileLayout = ({children}: Props) => {
  return (
    <DashboardContext>
      <div className="h-screen flex">
        <Sider />
        <div className="flex flex-col flex-1 min-h-screen">
          <div className="flex items-center shrink-0 justify-between px-4 h-14 border-b border-b-slate-200">
            <MenuToggle />
            <UserInfoDropdown />
          </div>
          <div className="flex-1 bg-slate-100">{children}</div>
        </div>
      </div>
    </DashboardContext>
  )
}
