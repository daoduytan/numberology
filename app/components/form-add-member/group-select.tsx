import {useFetcher} from '@remix-run/react'

export const GroupSelect = () => {
  const fetcher = useFetcher()
  return (
    <fetcher.Form method="get" action="/dashboard/group">
      <button onClick={(e: any) => fetcher.submit(e.target.form)}>
        submit
      </button>
    </fetcher.Form>
  )
}
