import clsx from 'clsx'
import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import type {ReactNode} from 'react'
import {PageSize} from '~/components'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
} from '@heroicons/react/solid'

enum ETypes {
  ADD_TOAST = 'toast/add-toast',
  REMOVE_TOAST = 'toast/remove-toast',
}

type TToastVariant = 'danger' | 'success' | 'info' | 'warning'

interface IToastItem {
  key: number
  message: string
  variant: TToastVariant
  id: string
}

interface IState {
  items: IToastItem[]
}

interface IAction {
  type: ETypes
  payload?: any
}

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ETypes.ADD_TOAST:
      const item = {
        ...action.payload,
        key: state.items.length + 1,
        id: Date.now().toString(),
      }
      return {
        ...state,
        items: [item, ...state.items],
      }

    case ETypes.REMOVE_TOAST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      }

    default:
      return state
  }
}

const initialState: IState = {
  items: [],
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

interface ToastItemProps {
  toast: IToastItem
}

const getClsVariantToast = (variant: TToastVariant): string => {
  if (variant === 'success') {
    return 'bg-green-600 text-white'
  }

  if (variant === 'danger') {
    return 'bg-red-600 text-white'
  }
  if (variant === 'warning') {
    return 'bg-orange-600 text-white'
  }

  return 'border border-slate-200 bg-white'
}

const renderIconToast = (variant: TToastVariant) => {
  if (variant === 'success') {
    return <CheckCircleIcon />
  }
  if (variant === 'warning') {
    return <ExclamationIcon />
  }

  if (variant === 'danger') {
    return <ExclamationCircleIcon />
  }
  if (variant === 'info') {
    return <ExclamationCircleIcon />
  }
  return <></>
}

const ToastItem = ({toast}: ToastItemProps) => {
  const [isRemove, setIsRemove] = useState<boolean>(false)
  const {removeToast} = useToast()

  useEffect(() => {
    function handleRemoveToast() {
      const timeout = toast.key * 1500

      setTimeout(() => {
        setIsRemove(true)
      }, timeout - 500)

      setTimeout(() => {
        removeToast(toast.id)
      }, timeout)
    }
    handleRemoveToast()
  }, [removeToast, toast.key, toast.id])

  const clsVariant = getClsVariantToast(toast.variant)
  const clsAnimation = isRemove ? 'translate-x-full opacity-0' : ''

  const icon = renderIconToast(toast.variant)

  return (
    <div
      className={clsx(
        'flex gap-4 items-center pl-2 pr-3 py-1 my-2 transition-all text-sm max-w-xs rounded',
        clsVariant,
        clsAnimation,
      )}
    >
      {cloneElement(icon, {className: 'h-8 w-8'})}
      {toast.message}
    </div>
  )
}

interface Props {
  children: ReactNode
}

export const ToastProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({state, dispatch}), [state, dispatch])

  const renderItemToast = () => {
    return state.items.map(i => {
      return <ToastItem toast={i} key={i.id} />
    })
  }

  return (
    <Context.Provider value={value}>
      <>
        {children}
        <div className="fixed top-0 right-0 p-4">{renderItemToast()}</div>
      </>
    </Context.Provider>
  )
}

export const useToast = () => {
  const {state, dispatch} = useContext(Context)

  const toast = useCallback(
    (data: {message: string; variant: TToastVariant}) => {
      dispatch({
        type: ETypes.ADD_TOAST,
        payload: data,
      })
    },
    [dispatch],
  )

  const removeToast = useCallback(
    (id: string) => {
      dispatch({
        type: ETypes.REMOVE_TOAST,
        payload: id,
      })
    },
    [dispatch],
  )

  return {...state, toast, removeToast}
}
