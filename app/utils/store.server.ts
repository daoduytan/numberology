import {json} from '@remix-run/node'
import {StatusCodes} from 'http-status-codes'
import {ErrorCode} from './constants'
import {prisma} from './prisma.server'

export async function createStore(ownerId: string) {
  try {
    const ownerExist = await prisma.store.findFirst({
      where: {
        ownerId,
      },
    })

    if (ownerExist) {
      return json(
        {
          message: ErrorCode.STORE_EXIST,
        },
        {
          status: StatusCodes.CONFLICT,
        },
      )
    }

    return await prisma.store.create({
      data: {
        ownerId,
      },
    })
  } catch (error) {
    console.log({createStore: error})
    return json(
      {message: 'Create store error'},
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    )
  }
}

export async function getStore(ownerId?: string) {
  return await prisma.store.findUnique({
    where: {
      ownerId,
    },
  })
}
