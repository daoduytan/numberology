import type {LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData, useNavigate} from '@remix-run/react'
import {FormAddMember, Modal, ModalHeading} from '~/components'
import {getGroupListStore} from '~/utils/group.server'

export const loader: LoaderFunction = async ({request}) => {
  const groups = await getGroupListStore(request)
  return json(groups)
}

export default function AddMember() {
  const data = useLoaderData()
  const navigate = useNavigate()

  const closeModal = () => navigate('../../member')

  return (
    <Modal
      callback={closeModal}
      size="xl"
      heading={<ModalHeading title="Thêm thành viên" onClose={closeModal} />}
    >
      <FormAddMember
        action="../../member"
        groups={data}
        callback={closeModal}
      />
    </Modal>
  )
}
