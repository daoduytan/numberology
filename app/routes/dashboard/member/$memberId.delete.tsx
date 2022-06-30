import type {LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useFetcher, useLoaderData, useNavigate} from '@remix-run/react'
import {useCallback, useEffect} from 'react'
import {Button, Modal} from '~/components'
import {useToast} from '~/context'
import {getMemberInfo} from '~/utils/member.server'

export const loader: LoaderFunction = async ({params}) => {
  const {memberId} = params

  if (!memberId) {
    return json(
      {
        message: 'Member not found',
      },
      {
        status: 404,
      },
    )
  }

  const member = await getMemberInfo(memberId)

  if (!member) {
    return json(
      {
        message: 'Member not found',
      },
      {
        status: 404,
      },
    )
  }

  return json(member)
}

export default function DeleteMember() {
  const {toast} = useToast()
  const navigate = useNavigate()
  const fetcher = useFetcher()
  const data = useLoaderData()

  const closeModal = useCallback(() => {
    navigate('../../member')
  }, [navigate])

  useEffect(() => {
    if (fetcher.data && fetcher.state === 'idle') {
      closeModal()
      toast({message: 'Xoá thành viên thành công', variant: 'success'})
    }
  }, [fetcher.data, fetcher.state, closeModal, toast])

  return (
    <Modal callback={closeModal} size="lg">
      <fetcher.Form
        method="delete"
        action="../../member"
        className="grid gap-6"
      >
        <div className="text-center">
          <div className="text-2xl text-medium mb-2">Xoá thành viên</div>
          <p className="text-slate-600">
            Bạn chắc chắn muốn xoá thành viên{' '}
            <span className="font-semibold text-orange-600">
              {data.fullname}
            </span>{' '}
            ?
          </p>
        </div>

        <input name="id" value={data.id} hidden />
        <div className="flex gap-4 items-center justify-center">
          <Button onClick={closeModal} className="px-4 py-2">
            Huỷ
          </Button>
          <Button
            color="danger"
            variant="contained"
            type="submit"
            name="_action"
            value="delete"
          >
            Xoá thành viên
          </Button>
        </div>
      </fetcher.Form>
    </Modal>
  )
}
