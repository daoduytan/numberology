import {pick} from 'lodash'
import {getUserId} from './auth.server'
import {metalStress} from './metal-stress.server'
import {prisma} from './prisma.server'
import {getStore} from './store.server'

export async function getGroupList(storeId: string) {
  try {
    const groups = await prisma.groupMemberCustomer.findMany({
      where: {
        storeId,
      },
      select: {
        name: true,
        id: true,
        description: true,
        memberCustomer: {
          select: {
            id: true,
          },
        },
      },
    })

    return groups
  } catch (error) {
    console.log({error1: error})
  }
}

export async function getGroupListStore(request: Request) {
  const userId = await getUserId(request)

  if (!userId) {
    return []
  }

  const store = await getStore(userId)

  console.log({store})

  if (!store) {
    return []
  }

  return await getGroupList(store.id)
}

// create group
interface DataCreateGroup {
  name: string
  storeId: string
  description?: string
}

export async function createGroup(data: DataCreateGroup) {
  return await prisma.groupMemberCustomer.create({
    data,
  })
}

export async function deleteGroup(groupId: string) {
  return await prisma.groupMemberCustomer.delete({
    where: {
      id: groupId,
    },
  })
}

export async function getDataMeanGroup({
  groupId,
  memberId,
}: {
  groupId?: string
  memberId?: string
}) {
  console.log({groupId, memberId})

  const memberList = await prisma.memberCustomer.findMany({
    where: {
      groupId,
    },
  })

  console.log({memberList})

  const memberListFormat = memberList.map(i =>
    pick(i, ['fullname', 'birthday', 'id']),
  )

  const mainMember = memberListFormat.find(i => i.id === memberId)

  const memberListFilter = memberListFormat.filter(i => i.id !== memberId)

  const data = metalStress({
    mainMember,
    memberList: memberListFilter,
  })

  console.log({data})

  return data
}

export async function getGroupDetail(groupId?: string) {
  try {
    console.log({groupId})

    const group = await prisma.groupMemberCustomer.findUnique({
      where: {
        id: groupId,
      },
    })
    console.log({group})

    return group
  } catch (error) {
    console.log(error)
  }
}
