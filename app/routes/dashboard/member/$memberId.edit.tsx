import type {GroupMemberCustomer, MemberCustomer} from '@prisma/client'
import type {LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData, useNavigate} from '@remix-run/react'
import {pick} from 'lodash'
import {FormAddMember, Modal, ModalHeading} from '~/components'
import {getGroupListStore} from '~/utils/group.server'
import {getMemberInfo} from '~/utils/member.server'

export const loader: LoaderFunction = async ({request, params}) => {
  try {
    const {memberId} = params

    if (!memberId) {
      return json(
        {
          message: 'Member not found',
        },
        {status: 404},
      )
    }

    const member = await getMemberInfo(memberId)
    const groups = await getGroupListStore(request)

    return json({member, groups})
  } catch (error) {
    return json(
      {
        message: 'Internal server error',
      },
      {status: 500},
    )
  }
}

interface DataMemberEdit {
  groups: GroupMemberCustomer[]
  member?: MemberCustomer
}

export default function MemberDetailEdit() {
  const navigate = useNavigate()
  const data = useLoaderData<DataMemberEdit>()

  const closeModal = () => navigate('../../member')

  return (
    <Modal
      heading={<ModalHeading title="Chỉnh sửa" onClose={closeModal} />}
      callback={closeModal}
      size="lg"
    >
      <FormAddMember
        action="../../member"
        callback={closeModal}
        groups={data.groups}
        defaultValue={pick(data.member, [
          'id',
          'code',
          'email',
          'fullname',
          'birthday',
          'phone',
          'address',
          'groupId',
          'gender',
        ])}
      />
    </Modal>
  )
}
