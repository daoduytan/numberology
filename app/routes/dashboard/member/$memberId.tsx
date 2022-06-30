import type {LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData, useNavigate} from '@remix-run/react'
import {Modal, ModalHeading} from '~/components'
import {Numberology} from '~/components/numberology/numberology'
import {getMemberDetail} from '~/utils/member.server'

export const loader: LoaderFunction = async ({params}) => {
  try {
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

    const memberDetail = await getMemberDetail(memberId)

    if (!memberDetail.member) {
      return json(
        {
          message: 'Member not found',
        },
        {
          status: 404,
        },
      )
    }

    return json(memberDetail)
  } catch (error) {
    console.log({error})
    return json(
      {
        message: 'Internal server error',
      },
      {status: 500},
    )
  }
}
export default function MemberDetail() {
  const data = useLoaderData()
  const navigate = useNavigate()
  const closeModal = () => navigate('../../member')
  return (
    <Modal
      heading={<ModalHeading title="Chi tiết" onClose={closeModal} />}
      callback={closeModal}
    >
      <Numberology
        name={data?.member?.fullname}
        date={data.member?.birthday}
        pythagoras={data?.pythagoras}
      />
    </Modal>
  )
}
