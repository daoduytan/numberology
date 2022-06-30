import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'

import {useLoaderData} from '@remix-run/react'
import moment from 'moment'
import {
  Container,
  FormSearch,
  GoTop,
  Section,
  SectionHeadingDescription,
  SectionHeadingTitle,
} from '~/components'
import {Numberology} from '~/components/numberology/numberology'
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

    const url = `/search?date=${moment(date as string, 'YYYY-MM-DD').format(
      'DD/MM/YYYY',
    )}&name=${name}`

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

interface ActionData {
  error: boolean
  data: any
  params: {
    name?: string
    date?: string
  }
}

export default function SearchResult() {
  const {error, data, params} = useLoaderData<ActionData>()

  console.log({data})

  if (error) {
    return (
      <main>
        <Section backgroundColor="#fff">
          <Container>
            <div className="mx-auto max-w-lg py-40">
              <h3 className="text-3xl text-center mb-6">
                Xem Thần Số Học Online
              </h3>
              <div className="bg-white py-10 px-16 border border-slate-200">
                <FormSearch />
              </div>
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  return (
    <GoTop>
      <main>
        <Section>
          <Container>
            <Numberology
              pythagoras={data}
              name={params.name as string}
              date={params.date as string}
            />
          </Container>
        </Section>

        <Section backgroundColor="#21212C">
          <Container>
            <div className="max-w-lg mx-auto grid gap-6 mb-10">
              <div className="text-white text-center">
                <SectionHeadingTitle>
                  Infinite power of numerology
                </SectionHeadingTitle>
                <SectionHeadingDescription>
                  <span className="center text-white/80">
                    Fusce sit amet velit eleifend, iaculis velit quis, malesuada
                    lacus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                  </span>
                </SectionHeadingDescription>
              </div>
              <div className="max-w-md mx-auto">
                <FormSearch light />
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </GoTop>
  )
}
