import type {LoaderFunction, MetaFunction} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import {AuthContext, ToastProvider} from './context'
import {StoreContext} from './context/store.context'
import styles from './styles/app.css'
import globalStyleUrl from './styles/global.css'
import {getUser} from './utils/auth.server'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
    {
      rel: 'stylesheet',
      href: globalStyleUrl,
    },
  ]
}

export const loader: LoaderFunction = async ({request}) => {
  const data = await getUser(request)

  return data
}

export default function App() {
  const data = useLoaderData()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ToastProvider>
          <AuthContext user={data?.user}>
            <StoreContext store={data?.store}>
              <Outlet />
            </StoreContext>
          </AuthContext>
        </ToastProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
