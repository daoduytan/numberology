import type {ActionFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {Form, Link, useActionData, useTransition} from '@remix-run/react'
import {get} from 'lodash'
import {AuthLayout, Button, FormField, Input} from '~/components'
import {register} from '~/utils/auth.server'
import {getErrorField} from '~/utils/getErrorField'
import {
  validateEmail,
  validateLength,
  validatePhone,
  validateRequired,
} from '~/utils/validator'

// const badRequest = (data: ActionData) => json(data, {status: 400})

interface SignupData {
  errorFields: any
  error?: string
}

export const action: ActionFunction = async ({request}) => {
  try {
    const form = await request.formData()

    const phone = form.get('phone')
    const email = form.get('email')
    const fullname = form.get('fullname')
    const password = form.get('password')
    const passwordConfirm = form.get('passwordConfirm')

    if (
      typeof phone !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof passwordConfirm !== 'string'
    ) {
      return json({
        error: 'Đã xảy ra lỗi, vui lòng thử lại',
      })
    }

    const errorFields = {
      phone: {
        required: validateRequired({
          value: phone,
          message: 'Số điện thoại không được bỏ trống',
        }),
        validator: validatePhone(phone),
      },
      fullname: {
        maxLength: validateLength({
          value: 50,
          str: fullname as string,
          type: 'max',
          message: 'Họ và tên không quá 50 ký tự',
        }),

        minLength: validateLength({
          value: 5,
          str: fullname as string,
          type: 'min',
          message: 'Họ và tên phải lớn hơn 5 ký tự',
        }),
      },

      email: {
        validator: validateEmail(email),
      },

      password: {
        require: validateRequired({
          value: password,
          message: 'Mật khẩu không được bỏ trống',
        }),
        maxLength: validateLength({
          str: password,
          value: 50,
          type: 'max',
          message: 'Mật khẩu phải nhỏ hơn 50 ký tự',
        }),
        minLength: validateLength({
          str: password,
          value: 8,
          type: 'min',
          message: 'Mật khẩu phải lớn hơn 7 ký tự',
        }),
      },
      passwordConfirm: {
        require: validateRequired({
          value: passwordConfirm,
          message: 'Mật khẩu xác nhận không được bỏ trống',
        }),
        validator:
          password !== passwordConfirm
            ? 'Mật khẩu xác nhận không đúng'
            : undefined,
      },
    }

    const errorsMap = Object.keys(errorFields)

      .map(item => Object.values(errorFields[item]).some(Boolean)) // TODO: fix type
      .filter(item => item)

    if (errorsMap.length > 0) {
      return json({errorFields})
    }

    return await register({
      phone,
      email,
      fullname,
      password,
    })
  } catch (error) {
    console.log({error})
    return json(
      {
        message: 'Đã xảy ra lỗi, vui lòng thử lại',
      },
      {
        status: 500,
      },
    )
  }
}

export default function Signup() {
  const data = useActionData<SignupData>()
  const transition = useTransition()

  const errorFields = get(data, 'errorFields')
  const errors = errorFields && getErrorField(get(data, 'errorFields'))

  return (
    <AuthLayout>
      <Form method="post" className="grid gap-4 w-96">
        <h2 className="text-center text-4xl font-bold mb-6 font-serif">
          Đăng ký
        </h2>

        <FormField label="Số điện thoại" required error={get(errors, 'phone')}>
          <Input
            type="tel"
            name="phone"
            placeholder="Điền số điện thoại"
            block
          />
        </FormField>

        <FormField label="Email" error={get(errors, 'email')}>
          <Input
            block
            type="email"
            name="email"
            placeholder="Điền địa chỉ email"
          />
        </FormField>

        <FormField label="Họ và tên" error={get(errors, 'fullname')}>
          <Input
            block
            type="text"
            name="fullname"
            placeholder="Điền họ và tên"
          />
        </FormField>

        <FormField label="Mật khẩu" required error={get(errors, 'password')}>
          <Input
            block
            type="password"
            name="password"
            placeholder="Điền mật khẩu"
          />
        </FormField>
        <FormField
          label="Xác nhận mật khẩu"
          required
          error={get(errors, 'passwordConfirm')}
        >
          <Input
            block
            type="password"
            name="passwordConfirm"
            placeholder="Điền xác nhận mật khẩu"
          />
        </FormField>

        <Button
          type="submit"
          disabled={!!transition.submission}
          color="primary"
          variant="contained"
        >
          Đăng ký
        </Button>

        <div className="text-center border-t border-slate-200 pt-4 mt-4">
          <p>
            Bạn đã có tài khoản?
            <Link
              to="/login"
              className="ml-2 text-orange-600 hover:text-orange-500"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </Form>
    </AuthLayout>
  )
}
