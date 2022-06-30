import type {GroupMemberCustomer} from '@prisma/client'
import {useFetcher} from '@remix-run/react'
import {get} from 'lodash'
import {useEffect, useRef} from 'react'
import {useToast} from '~/context'
import {getErrorField} from '~/utils/getErrorField'
import {Button, FormField, Input, Select, TextArea} from '../common'

interface IFormAddMemberValue {
  id?: string | null
  code?: string | null
  fullname?: string | null
  birthday?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  groupId?: string | null
  gender?: string | null
}

interface Props {
  hasGroup?: boolean
  groups: GroupMemberCustomer[]
  groupId?: string
  callback?: () => void
  defaultValue?: IFormAddMemberValue
  action: string
}

export const FormAddMember = ({
  hasGroup,
  groups = [],
  defaultValue,
  callback,
  action,
}: Props) => {
  const formRef = useRef<any>()
  const {toast} = useToast()
  const fetcher = useFetcher()
  const isEdit = !!defaultValue?.fullname

  const errorFields = get(fetcher, 'data.errorFields')
  const errors = errorFields && getErrorField(errorFields)

  const errorCode = errors?.code
  const errorFullname = errors?.fullname
  const errorBirthday = errors?.birthday
  const errorPhone = errors?.phone
  const errorEmail = errors?.email
  const errorAddress = errors?.address

  const formAction = fetcher.submission?.formData.get('_action')

  const isSubmiting =
    fetcher.state === 'submitting' &&
    ['create', 'put', 'post'].includes(formAction)

  useEffect(() => {
    if (fetcher.data && !errorFields && fetcher.state === 'idle') {
      const message = isEdit
        ? 'Chỉnh sửa thành viên thành công'
        : 'Thêm thành viên thành công'

      toast({
        message,
        variant: 'success',
      })

      formRef.current.reset()

      if (callback && formAction !== 'post_add') {
        callback()
      }
    }
  }, [fetcher.data, fetcher.state, toast, isEdit])

  return (
    <fetcher.Form
      className="grid gap-4"
      method="post"
      action={action}
      ref={formRef}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          {isEdit && (
            <input name="id" value={defaultValue.id as string} hidden />
          )}
          <FormField label="Phòng, ban" required>
            <Select
              name="groupId"
              label="Chọn phòng, ban"
              block
              defaultValue={defaultValue?.groupId}
            >
              {groups.map(group => {
                return (
                  <option value={group.id} key={group.id}>
                    {group.name}
                  </option>
                )
              })}
            </Select>
          </FormField>
        </div>
        <div>
          <FormField label="Mã nhân viên" required error={errorCode}>
            <Input
              block
              placeholder="Điền mã nhân viên"
              name="code"
              defaultValue={defaultValue?.code}
            />
          </FormField>
        </div>
      </div>
      <FormField label="Họ và tên" required error={errorFullname}>
        <Input
          placeholder="Điền họ và tên nhân viên"
          name="fullname"
          block
          defaultValue={defaultValue?.fullname}
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Ngày sinh" required error={errorBirthday}>
          <Input
            placeholder="Điền ngày sinh"
            type="date"
            block
            name="birthday"
            defaultValue={defaultValue?.birthday}
          />
        </FormField>
        <FormField label="Số điện thoại" required error={errorPhone}>
          <Input
            defaultValue={defaultValue?.phone}
            placeholder="Điền số điện thoại"
            type="tel"
            name="phone"
            block
          />
        </FormField>
      </div>
      <FormField label="Giới tính">
        <Select
          name="gender"
          label="Chọn giới tính"
          defaultValue={defaultValue?.gender}
        >
          <option value="MALE">Nam</option>
          <option value="FEMALE">Nữ</option>
          <option value="OTHER">Khác</option>
        </Select>
      </FormField>
      <FormField label="Địa chỉ" error={errorAddress}>
        <TextArea
          block
          name="address"
          defaultValue={defaultValue?.address}
          placeholder="Điền địa chỉ của nhân viên"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Email" error={errorEmail}>
          <Input
            defaultValue={defaultValue?.email}
            placeholder="Địa chỉ chỉ Email"
            name="email"
            type="email"
            block
          />
        </FormField>
        <FormField label="Vị trí làm việc">
          <Select name="position" block label="Chọn vị trí làm việc"></Select>
        </FormField>
      </div>

      <div className="flex justify-between gap-4 mt-4">
        <Button loading={isSubmiting} className="px-3 py-2" type="reset">
          Huỷ
        </Button>
        <div className="flex gap-4">
          <Button
            variant={isEdit ? 'contained' : 'default'}
            color="primary"
            type="submit"
            name="_action"
            value={isEdit ? 'put' : 'post'}
            className="px-4 py-2"
            loading={isSubmiting}
          >
            Lưu
          </Button>
          {!isEdit && (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              name="_action"
              value={isEdit ? 'put_add' : 'post_add'}
              className="px-4 py-2"
              loading={isSubmiting}
            >
              {isSubmiting ? 'Loading' : 'Lưu và Thêm mới'}
            </Button>
          )}
        </div>
      </div>
    </fetcher.Form>
  )
}
