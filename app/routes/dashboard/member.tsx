import {DotsVerticalIcon, PlusIcon} from '@heroicons/react/solid'
import type {Gender, MemberCustomer} from '@prisma/client'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {Form, Link, Outlet, useLoaderData} from '@remix-run/react'
import type {ColumnsType} from '~/components'
import {
  Card,
  DropDown,
  Tag,
  Button,
  ETableAlign,
  Input,
  Pagination,
  Select,
  Table,
  PageSize,
} from '~/components'
import {DashboardContent} from '~/components/layout/dashboard-content'
import {
  addMemberCustomer,
  deleteMemberCustomer,
  getMemberCustomer,
} from '~/utils/customer.server'
import {
  validateLength,
  validateRequired,
  validateFields,
  validatePhone,
  validateEmail,
} from '~/utils/validator'

export const loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url)

  const page = url.searchParams.get('page')
  const search = url.searchParams.get('search')
  const groupId = url.searchParams.get('groupId')

  let params = {page, search, groupId}

  const data = await getMemberCustomer(params)
  return json(data)
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()

  const _action = formData.get('_action')
  const fullname = formData.get('fullname')
  const birthday = formData.get('birthday')
  const groupId = formData.get('groupId')
  const code = formData.get('code')
  const gender = formData.get('gender')
  const address = formData.get('address')
  const phone = formData.get('phone')
  const email = formData.get('email')
  const id = formData.get('id')

  const data: any = {}

  if (fullname) data.fullname = fullname
  if (birthday) data.birthday = birthday
  if (groupId) data.groupId = groupId
  if (code) data.code = code
  if (gender) data.gender = gender
  if (email) data.email = email
  if (phone) data.phone = phone
  if (address) data.address = address

  const getValidateErrorFields = () => ({
    code: {
      required: validateRequired({
        value: data.code,
        message: 'H??? v?? t??n kh??ng ???????c ????? tr???ng',
      }),
      maxLength: validateLength({
        str: data.code,
        value: 128,
        message: 'M?? th??nh vi??n kh??ng qu?? 128 k?? t???',
        type: 'max',
      }),
    },
    fullname: {
      required: validateRequired({
        value: data.fullname,
        message: 'H??? v?? t??n kh??ng ???????c ????? tr???ng',
      }),
      maxLength: validateLength({
        str: data.fullname,
        value: 128,
        message: 'H??? v?? t??n kh??ng qu?? 128 k?? t???',
        type: 'max',
      }),
    },

    phone: {
      required: validateRequired({
        value: data.phone,
        message: 'S??? ??i???n tho???i kh??ng ???????c ????? tr???ng',
      }),
      maxLength: validatePhone(data.phone),
    },

    birthday: {
      required: validateRequired({
        value: data.birthday,
        message: 'H??? v?? t??n kh??ng ???????c ????? tr???ng',
      }),
    },
    email: {
      validator: validateEmail(data.email),
      maxLength: validateLength({
        str: data.email,
        value: 255,
        message: 'Email kh??ng qu?? 255 k?? t???',
        type: 'max',
      }),
    },

    address: {
      maxLength: validateLength({
        str: data.email,
        value: 255,
        message: '?????a ch??? kh??ng qu?? 255 k?? t???',
        type: 'max',
      }),
    },
  })

  const validateFormFields = (callback: () => void) => {
    const errorFields = getValidateErrorFields()

    const isErrorField = validateFields(errorFields)

    if (isErrorField) {
      return json({errorFields})
    }

    return callback()
  }

  switch (_action) {
    case 'post':
      return validateFormFields(async () => await addMemberCustomer(data))

    case 'post_add':
      return validateFormFields(async () => await addMemberCustomer(data))

    case 'delete':
      return await deleteMemberCustomer(id as string)

    case 'put':
      return validateFormFields(
        async () =>
          await addMemberCustomer({
            ...data,

            id: id as string,
          }),
      )

    default:
      return json({error: `Invalid Form Data`}, {status: 400})
  }
}

interface MemberDataLoader {
  members: MemberCustomer[]
  total: number
}

export const GenderMember = ({gender}: {gender?: Gender}) => {
  if (!gender) {
    return <></>
  }

  const getLabel = () => {
    if (gender === 'FEMALE') {
      return 'N???'
    }
    if (gender === 'MALE') {
      return 'Nam'
    }
    return 'Kh??c'
  }

  const label = getLabel()

  return <Tag color="primary" label={label} />
}

export default function Members() {
  const data = useLoaderData<MemberDataLoader>()

  console.log({data})

  const columns: ColumnsType<MemberCustomer> = [
    {
      dataIndex: 'code',
      title: 'M?? nh??n vi??n',
      render: (value, root) => {
        return <Link to={root.id}>#{value}</Link>
      },
    },
    {
      dataIndex: 'fullname',
      title: 'H??? v?? t??n',
    },
    {
      dataIndex: 'birthday',
      title: 'Ng??y sinh',
    },
    {
      dataIndex: 'gender',
      title: 'Gi???i t??nh',
      render: value => <GenderMember gender={value} />,
    },
    {
      dataIndex: 'group',
      title: 'Ph??ng ban',
      render: group => group?.name,
    },
    {
      dataIndex: 'root',
      align: ETableAlign.Right,
      render: (_, root) => {
        return (
          <DropDown
            label={
              <Button icon={<DotsVerticalIcon className="h-5 w-5" />}></Button>
            }
            placement="right"
          >
            <div className="text-left">
              <Link
                to={`${root.id}/delete`}
                className="whitespace-nowrap block p-2 hover:bg-blue-600/10"
              >
                Xo??
              </Link>
              <Link
                to={`${root.id}/edit`}
                className="whitespace-nowrap block p-2 hover:bg-blue-600/10"
              >
                Ch???nh s???a
              </Link>
            </div>
          </DropDown>
        )
      },
    },
  ]

  return (
    <DashboardContent headingTitle="Th??nh vi??n">
      <div>
        <div className="pb-4 flex justify-between">
          <Form className="flex items-center gap-4" method="get">
            <span>T??m ki???m</span>
            <Input type="search" name="search" placeholder="T??m ki???m" />
            <Select label="Ch???n nh??m"></Select>
            <Button type="submit" variant="contained">
              T??m ki???m
            </Button>
          </Form>
          <Link to="add-member">
            <Button
              icon={<PlusIcon className="h-5 w-5" />}
              color="primary"
              variant="contained"
              size="lg"
            ></Button>
          </Link>
        </div>
        <Card
          bodyStyle={{padding: 0}}
          heading={{
            title: 'Danh s??ch th??nh vi??n',
          }}
        >
          <Table
            rowKey="id"
            data={data.members}
            columns={columns}
            hasNumberOrder
          />
          {data.total > 0 && (
            <div className="flex justify-between px-4 py-3">
              <PageSize />
              <Pagination
                onChange={() => {}}
                total={data.total}
                size={10}
                current={1}
              />
            </div>
          )}
        </Card>
      </div>
      <Outlet />
    </DashboardContent>
  )
}
