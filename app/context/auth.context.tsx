import type {User} from '@prisma/client'
import {createContext, useContext, useEffect, useMemo, useReducer} from 'react'
import type {ReactNode} from 'react'

const types = {
  LOAD_USER: 'auth/load-user',
}

interface IState {
  user?: User
  loading: boolean
}

const initialState: IState = {
  user: undefined,
  loading: true,
}

interface IAction {
  type: string
  payload?: any
}

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case types.LOAD_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

interface IContext {
  state: IState
  dispatch: React.Dispatch<any>
}

const initialContext: IContext = {
  state: initialState,
  dispatch: () => {},
}

const Context = createContext<IContext>(initialContext)

interface Props {
  children: ReactNode
  user?: User
}

export const AuthContext = ({children, user}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: types.LOAD_USER,
      payload: user,
    })
  }, [user])

  const value = useMemo(() => ({state, dispatch}), [state, dispatch])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useAuth = () => {
  const {state} = useContext(Context)
  return {
    ...state,
  }
}
