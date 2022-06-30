import type {Store} from '@prisma/client'
import {createContext, useContext, useEffect, useMemo, useReducer} from 'react'
import type {ReactNode} from 'react'

const types = {
  LOAD_STORE: 'store/load-store',
}

interface IState {
  store?: Store
  loading: boolean
}

const initialState: IState = {
  store: undefined,
  loading: true,
}

interface IAction {
  type: string
  payload?: any
}

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case types.LOAD_STORE:
      return {
        ...state,
        store: action.payload,
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
  store?: Store
}

export const StoreContext = ({children, store}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: types.LOAD_STORE,
      payload: store,
    })
  }, [store])

  const value = useMemo(() => ({state, dispatch}), [state, dispatch])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useStore = () => {
  const {state} = useContext(Context)
  return {
    ...state,
  }
}
