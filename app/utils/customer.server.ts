import {omit} from 'lodash'
import {prisma} from './prisma.server'

interface DataParams {
  page?: string | null
  search?: string | null
  groupId?: string | null
}

const SIZE_PAGE = 15

export async function getMemberCustomer(params: DataParams) {
  try {
    let options: any = {}

    if (params.groupId) options.params = params.groupId

    const page = params.page ? +params.page - 1 : 0

    const members = await prisma.memberCustomer.findMany({
      where: {
        ...options,
      },
      skip: SIZE_PAGE * page,
      take: SIZE_PAGE,
      select: {
        id: true,
        code: true,
        birthday: true,
        fullname: true,
        gender: true,
        address: true,
        phone: true,
        email: true,
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    const total = await prisma.memberCustomer.count()

    return {
      members,
      total,
    }
  } catch (error) {
    console.log({getMemberCustomer: error})
    return {
      members: [],
      total: 0,
    }
  }
}

export interface AddMemberData {
  id?: string
  fullname: string
  birthday: string
  code: string
  groupId: string
}

export async function addMemberCustomer(data: AddMemberData) {
  const dataUpdate = omit(data, ['id'])

  if (data.id) {
    return await prisma.memberCustomer.update({
      where: {
        id: data.id,
      },
      data: {
        ...dataUpdate,
      },
    })
  }

  return await prisma.memberCustomer.create({
    data: {
      ...dataUpdate,
    },
  })
}

export async function deleteMemberCustomer(memberId: string) {
  return await prisma.memberCustomer.delete({
    where: {
      id: memberId,
    },
  })
}
