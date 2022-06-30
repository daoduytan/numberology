import type {ActionFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useFetcher, useNavigate} from '@remix-run/react'
import {StatusCodes} from 'http-status-codes'
import {get} from 'lodash'
import {useCallback, useEffect} from 'react'
import {
  Button,
  FormField,
  Input,
  Modal,
  ModalHeading,
  TextArea,
} from '~/components'
import {useToast} from '~/context'
import {useStore} from '~/context/store.context'
import {getErrorField} from '~/utils/getErrorField'
import {createGroup} from '~/utils/group.server'
import {
  validateFields,
  validateLength,
  validateRequired,
} from '~/utils/validator'

export const action: ActionFunction = async ({request}) => {
  try {
    const form = await request.formData()
    const name = form.get('name')
    const description = form.get('description')
    const storeId = form.get('storeId')

    if (
      typeof name !== 'string' ||
      typeof storeId !== 'string' ||
      typeof description !== 'string'
    ) {
      return json({
        message: 'Form submitted not valid',
        succees: false,
        data: null,
      })
    }

    const errorFields = {
      name: {
        required: validateRequired({
          value: name,
          message: 'Tên nhóm không được bỏ trống',
        }),
        maxLength: validateLength({
          value: 150,
          str: name,
          message: 'Tên nhóm không được quá 150 ký tự',
          type: 'max',
        }),
      },
      description: {
        maxLength: validateLength({
          value: 250,
          str: description,
          message: 'Ghi chú không được quá 250 ký tự',
          type: 'max',
        }),
      },
    }

    const isErrorField = validateFields(errorFields)

    if (isErrorField) {
      return json({errorFields, data: null, succees: false})
    }

    const group = await createGroup({
      name,
      description,
      storeId,
    })

    return json(
      {
        data: group,
        success: true,
      },
      {status: StatusCodes.OK},
    )
  } catch (error) {
    console.log({error})
    return json(
      {
        message: 'Error ',
      },
      {status: StatusCodes.INTERNAL_SERVER_ERROR},
    )
  }
}

export default function AddGroup() {
  const {toast} = useToast()
  const navigate = useNavigate()
  const {store} = useStore()

  const fetcher = useFetcher()

  const errorFields = get(fetcher.data, 'errorFields')
  const errors = errorFields && getErrorField(errorFields)
  const errorName = get(errors, 'name')
  const errorDescription = get(errors, 'description')

  const back = useCallback(() => navigate('../../group'), [navigate])

  console.log(fetcher)
  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === 'idle') {
      toast({
        message: 'Thêm nhóm thành công',
        variant: 'success',
      })

      back()
    }
  }, [toast, back, fetcher.data, fetcher.state])

  console.log({errors})

  return (
    <Modal
      size="md"
      callback={back}
      heading={<ModalHeading title="Thêm nhóm" onClose={back} />}
    >
      <fetcher.Form method="post" className="grid gap-4">
        <input name="storeId" value={store?.id} hidden />

        <FormField label="Tên nhóm" error={errorName}>
          <Input
            error={!!errorName}
            placeholder="Điền tên nhóm"
            block
            name="name"
          />
        </FormField>

        <FormField label="Ghi chú" error={errorDescription}>
          <TextArea
            name="description"
            error={!!errorDescription}
            block
            placeholder="Điền ghi chú cho nhóm"
          />
        </FormField>

        <div className="flex gap-4 justify-end">
          <Button type="reset" onClick={back}>
            Huỷ
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Tạo nhóm
          </Button>
        </div>
      </fetcher.Form>
    </Modal>
  )
}
