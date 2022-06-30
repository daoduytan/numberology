import {DotsVerticalIcon, PlusIcon} from '@heroicons/react/solid'
import type {GroupMemberCustomer} from '@prisma/client'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {Link, Outlet, useLoaderData} from '@remix-run/react'
import {StatusCodes} from 'http-status-codes'
import type {ColumnsType} from '~/components'
import {
  Button,
  Card,
  DropDown,
  ETableAlign,
  MenuItem,
  Table,
} from '~/components'
import {DashboardContent} from '~/components/layout/dashboard-content'
import {deleteGroup, getGroupListStore} from '~/utils/group.server'

export const loader: LoaderFunction = async ({request}) => {
  return await getGroupListStore(request)
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  const _action = formData.get('_action')

  switch (_action) {
    case 'delete':
      const groupId = formData.get('groupId')
      if (typeof groupId !== 'string') {
        return json(
          {error: 'Form field is not valid'},
          {status: StatusCodes.METHOD_NOT_ALLOWED},
        )
      }

      return deleteGroup(groupId)
    default:
      return
  }
}

export default function GroupMember() {
  const data = useLoaderData()

  console.log({data})

  const columns: ColumnsType<GroupMemberCustomer> = [
    {
      dataIndex: 'name',
      title: 'Tên nhóm',
    },
    {
      dataIndex: 'memberCustomer',
      title: 'Số lượng',
      render: value => {
        return <div>{value.length}</div>
      },
    },
    {
      dataIndex: 'description',
      title: 'Ghi chú',
    },

    {
      dataIndex: 'root',
      align: ETableAlign.Right,
      render: (_, root) => {
        return (
          <DropDown
            placement="right"
            label={<DotsVerticalIcon className="h-5 w-5" />}
          >
            <>
              <MenuItem>
                <Link to={`/dashboard/group/${root.id}`}>Chi tiết</Link>
              </MenuItem>
              <MenuItem>
                <Link to={`${root.id}/delete`}>Xoá</Link>
              </MenuItem>
            </>
          </DropDown>
        )
      },
    },
  ]
  return (
    <DashboardContent headingTitle="Nhóm">
      <Card
        heading={{
          title: 'Danh sách nhóm',
          extra: (
            <Link to="add">
              <Button size="sm" icon={<PlusIcon className="h-5 w-5 mr-1" />}>
                Thêm nhóm
              </Button>
            </Link>
          ),
        }}
        bodyStyle={{padding: 0}}
      >
        <Table columns={columns} data={data} rowKey="_id" />
      </Card>
      <Outlet />
    </DashboardContent>
  )
}
