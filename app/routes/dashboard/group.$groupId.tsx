import {PlusIcon} from '@heroicons/react/solid'
import type {GroupMemberCustomer, MemberCustomer} from '@prisma/client'
import type {LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import type {ColumnsType} from '~/components'
import {Button, Card, Table} from '~/components'
import {DashboardContent} from '~/components/layout/dashboard-content'
import {getGroupDetail} from '~/utils/group.server'
import {getMemberGroup} from '~/utils/member.server'
import {GenderMember} from './member'

export const loader: LoaderFunction = async ({params}) => {
  try {
    const group = await getGroupDetail(params.groupId)

    if (!group) {
      return json({
        group: null,
        members: [],
      })
    }
    const members = await getMemberGroup(params.groupId)
    return json({
      members,
      group,
    })
  } catch (error) {
    return json({
      group: null,
      members: [],
    })
  }
}

interface IDataLoader {
  group: GroupMemberCustomer | null
  members: MemberCustomer[]
}

export default function GroupDetail() {
  const data = useLoaderData<IDataLoader>()

  const columns: ColumnsType<MemberCustomer> = [
    {
      dataIndex: 'code',
      title: 'Mã nhân viên',
      render: (value, root) => {
        return <Link to={root.id}>#{value}</Link>
      },
    },
    {
      dataIndex: 'fullname',
      title: 'Họ và tên',
    },
    {
      dataIndex: 'birthday',
      title: 'Ngày sinh',
    },
    {
      dataIndex: 'gender',
      title: 'Giới tính',
      render: value => <GenderMember gender={value} />,
    },
  ]

  const renderContent = () => {
    if (!data.group) {
      return <div>Nhóm không tồn tại</div>
    }

    return (
      <Card
        heading={{
          title: data.group.name,
          extra: (
            <div className="flex gap-4">
              <Link to="add-member">
                <Button size="sm" icon={<PlusIcon className="h-5 w-5" />}>
                  Thêm thành viên
                </Button>
              </Link>
              <Link to="analysis">
                <Button size="sm" color="primary" variant="contained">
                  Phân tích nhóm
                </Button>
              </Link>
            </div>
          ),
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Table rowKey="id" data={data.members} columns={columns} />
      </Card>
    )
  }

  return (
    <DashboardContent headingTitle="Nhóm">{renderContent()}</DashboardContent>
  )
}
