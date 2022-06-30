import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'
import {Outlet} from '@remix-run/react'
import moment from 'moment'
import {BaseLayout} from '~/components'
import {pythagoras} from '~/utils/pythagoras'
import {validateFields, validateRequired} from '~/utils/validator'

export const action: ActionFunction = async ({request}) => {
  try {
    const form = await request.formData()

    const date = form.get('date')
    const name = form.get('fullname')

    if (typeof date !== 'string' || typeof name !== 'string') {
      return {
        error: 'Miss field',
      }
    }

    const errorFields = {
      name: {
        required: validateRequired({
          value: name,
          message: 'Họ và tên không được để trống',
        }),
      },
      date: {
        required: validateRequired({
          value: date,
          message: 'Ngày sinh không được để trống',
        }),
      },
    }

    const isError = validateFields(errorFields)

    if (isError) {
      return json({errorFields})
    }

    const url = `/search/result?date=${moment(
      date as string,
      'YYYY-MM-DD',
    ).format('DD/MM/YYYY')}&name=${name}`

    return redirect(url)
  } catch (error) {
    console.log({error})
    return error
  }
}

export const loader: LoaderFunction = ({request}) => {
  const url = new URL(request.url)

  const date = url.searchParams.get('date')
  const name = url.searchParams.get('name')

  if (typeof date !== 'string' || typeof name !== 'string') {
    return {
      error: true,
      data: null,
      params: {date, name},
    }
  }

  const params = {
    date: date as string,
    name: name as string,
  }

  return json({
    error: false,
    data: pythagoras(params),
    params,
  })
}

export default function Search() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
