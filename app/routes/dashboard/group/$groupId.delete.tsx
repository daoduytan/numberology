import type {LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useFetcher, useLoaderData, useNavigate} from '@remix-run/react'
import {StatusCodes} from 'http-status-codes'
import {useCallback, useEffect} from 'react'
import {Button, Modal} from '~/components'
import {useToast} from '~/context'

interface LoaderData {
  groupId: string
}

export const loader: LoaderFunction = ({params}) => {
  const {groupId} = params
  if (!groupId) {
    return json(
      {
        message: 'Group not found',
      },
      {status: StatusCodes.NOT_FOUND},
    )
  }

  return json({groupId})
}

export default function RemoveGroup() {
  const data = useLoaderData<LoaderData>()
  const fetcher = useFetcher()
  const {toast} = useToast()
  const navigate = useNavigate()
  const back = useCallback(() => navigate('../../group'), [navigate])

  useEffect(() => {
    if (fetcher.data && fetcher.state === 'idle') {
      toast({message: 'Đã xoá nhóm thành công', variant: 'success'})
      back()
    }
  }, [fetcher.data, fetcher.state, toast, back])

  return (
    <Modal callback={back} size="md">
      <fetcher.Form
        action="../../group"
        className="grid gap-4 text-center"
        method="delete"
      >
        <h3 className="text-4xl">Xoá nhóm</h3>
        <p>Bạn chắc chắn muốn xoá nhóm?</p>
        <input value={data.groupId} hidden name="groupId" />

        <div className="flex justify-center items-center gap-4">
          <Button onClick={back}>Huỷ</Button>
          <Button
            variant="contained"
            color="danger"
            type="submit"
            name="_action"
            value="delete"
            loading={fetcher.state === 'submitting'}
          >
            Xoá nhóm
          </Button>
        </div>
      </fetcher.Form>
    </Modal>
  )
}
