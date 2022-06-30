import type {MemberCustomer} from '@prisma/client'
import moment from 'moment'
import {prisma} from './prisma.server'
import type {IPythagorasResponse} from './pythagoras'
import {pythagoras} from './pythagoras'

interface MemeberDetailResponse {
  member?: MemberCustomer | null
  pythagoras?: IPythagorasResponse
}

export async function getMemberInfo(
  memberId: string,
): Promise<MemberCustomer | null> {
  return await prisma.memberCustomer.findUnique({
    where: {
      id: memberId,
    },
  })
}

export async function getMemberGroup(
  groupId?: string,
): Promise<Array<MemberCustomer>> {
  return await prisma.memberCustomer.findMany({
    where: {
      groupId,
    },
  })
}

export async function getMemberDetail(
  memberId: string,
): Promise<MemeberDetailResponse> {
  const member = await getMemberInfo(memberId)

  if (!member) {
    return {member: null}
  }

  const pythagorasMember = pythagoras({
    name: member.fullname,
    date: moment(member.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY'),
  })

  return {
    member,
    pythagoras: pythagorasMember,
  }
}
