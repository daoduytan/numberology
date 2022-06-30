import {json, LoaderFunction} from '@remix-run/node'
import {useLoaderData, useNavigate, useParams} from '@remix-run/react'
import {Card, FormAddMember} from '~/components'
import {DashboardContent} from '~/components/layout/dashboard-content'
import {getGroupListStore} from '~/utils/group.server'

export const loader: LoaderFunction = async ({request}) => {
  const groups = await getGroupListStore(request)
  return json(groups)
}

export default function AdMemberGroup() {
  const data = useLoaderData()
  const params = useParams()
  const navigate = useNavigate()
  const back = () => navigate(`../group/${params.groupId}`)

  return (
    <DashboardContent headingTitle="Thêm thành viên">
      <Card>
        <div className="max-w-xl mx-auto py-6">
          <FormAddMember
            action="../member"
            hasGroup
            defaultValue={{
              groupId: params?.groupId,
            }}
            callback={back}
            groups={data}
          />
        </div>
      </Card>
    </DashboardContent>
  )
}
