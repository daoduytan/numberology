import {useFetcher} from '@remix-run/react'
import {get} from 'lodash'
import {getErrorField} from '~/utils/getErrorField'
import {Button, FormField, Input} from '../common'

interface Props {
  light?: boolean
}

export const FormSearch = ({light}: Props) => {
  const fetcher = useFetcher()

  const errorFields = get(fetcher.data, 'errorFields')

  const errors = errorFields && getErrorField(errorFields)
  const errorName = get(errors, 'name')
  const errorDate = get(errors, 'date')

  return (
    <fetcher.Form className="grid gap-4" method="post" action="../../search">
      <FormField
        titleClass={light ? 'text-white' : ''}
        label="Họ và tên"
        error={errorName}
      >
        <Input
          type="text"
          name="fullname"
          placeholder="Điền họ và tên"
          block
          error={errorName}
        />
      </FormField>
      <FormField
        label="Ngày sinh"
        titleClass={light ? 'text-white' : ''}
        error={errorDate}
      >
        <Input
          type="date"
          name="date"
          placeholder="Điền ngày sinh"
          block
          error={errorDate}
        />
      </FormField>
      <Button className="px-10 py-2" type="submit">
        Tra cứu
      </Button>
    </fetcher.Form>
  )
}
