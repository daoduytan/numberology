import type {LoaderFunction} from '@remix-run/node'
import {getUserId} from '~/utils/auth.server'
import {getStore} from '~/utils/store.server'

export const loader: LoaderFunction = async ({request}) => {
  const userId = await getUserId(request)

  if (!userId) {
    return null
  }

  const store = await getStore(userId)

  return store
}
