import {createCookieSessionStorage, json, redirect} from '@remix-run/node'
import * as argon2 from 'argon2'
import {pick} from 'lodash'
import {prisma} from './prisma.server'
import {createStore, getStore} from './store.server'

// session

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'numberology-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 3, // 3 day // 72h
    httpOnly: true,
  },
})

const createUserSession = async (userId: string) => {
  const session = await storage.getSession()

  session.set('userId', userId)

  return session
}

export async function sendUserSession(userId: string, redirectTo: string) {
  try {
    const session = await createUserSession(userId)

    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await storage.commitSession(session),
      },
    })
  } catch (error) {
    console.log({error})
  }
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export interface RegisterData {
  fullname: FormDataEntryValue | null
  phone: string
  email: string
  password: string
}

// create user
export async function createUser(data: RegisterData) {
  const password = await argon2.hash(data.password)

  let dataValue: any = pick(data, ['phone', 'email'])

  if (data.fullname) {
    dataValue.fullname = data.fullname
  }

  const user = await prisma.user.create({
    data: {
      ...dataValue,
      password,
    },
  })

  if (!user) {
    return json({
      error: 'Đã xảy ra lỗi, vui lòng thử lại',
    })
  }

  await createStore(user.id)

  return sendUserSession(user.id, '/')
}

export async function register(data: RegisterData) {
  const existPhone = await prisma.user.count({
    where: {
      email: data.phone,
    },
  })

  if (existPhone) {
    return json({
      errorFields: {
        phone: {
          exist: 'Số điên thoại đã tồn tại',
        },
      },
    })
  }

  const existEmail = await prisma.user.count({
    where: {
      email: data.email,
    },
  })

  if (existEmail) {
    return json({
      errorFields: {
        email: {
          exist: 'Địa chỉ email đã tồn tại',
        },
      },
    })
  }

  return await createUser(data)
}

interface LoginData {
  username: string
  password: string
}
export async function login({username, password}: LoginData) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          phone: username,
        },
        {
          email: username,
        },
      ],
    },
  })

  if (users.length === 0) {
    return json({
      errorFields: {
        username: {validator: 'Số điện thoại/Email không tồn tại'},
      },
    })
  }

  // check password
  const isValidPassword = await argon2.verify(users[0].password, password)

  if (!isValidPassword) {
    return json({
      errorFields: {
        password: {
          validator: 'Mật khẩu không đúng',
        },
      },
    })
  }

  const userId = users[0].id

  return sendUserSession(userId, '/dashboard')
}

// logout
export async function logout(request: Request) {
  const session = await getUserSession(request)

  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}

// get user info
export async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')

  if (!userId || typeof userId !== 'string') return null

  return userId
}

export async function getUser(request: Request) {
  try {
    const userId = await getUserId(request)

    if (typeof userId !== 'string') {
      return null
    }

    const user = await prisma.user.findUnique({
      where: {id: userId},
      select: {id: true, email: true, fullname: true, phone: true},
    })

    if (!user) {
      throw await logout(request)
    }

    const store = await getStore(user.id)

    const session = await createUserSession(user.id)

    return json(
      {user, store},
      {
        headers: {
          'Set-Cookie': await storage.commitSession(session),
        },
      },
    )
  } catch (error) {
    console.log({error})
    throw await logout(request)
  }
}
