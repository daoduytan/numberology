import type {ActionFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {Form, Link, useActionData, useTransition} from '@remix-run/react'
import get from 'lodash/get'
import {AuthLayout, Button, Input, FormField} from '~/components'
import {login} from '~/utils/auth.server'
import {getErrorField} from '~/utils/getErrorField'
import {
  validateFields,
  validateRequired,
  validateSpacing,
} from '~/utils/validator'

export const action: ActionFunction = async ({request}) => {
  try {
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')

    if (typeof username !== 'string' || typeof password !== 'string') {
      return {
        formError: `Form not submitted correctly.`,
      }
    }

    const errorFields = {
      username: {
        required: validateRequired({
          value: username,
          message: 'Số điện thoại/Email không được bỏ trống',
        }),
        validator: validateSpacing({
          value: username,
          message: 'Số điện thoại/Email không được có khoảng trắng',
        }),
      },
      password: {
        required: validateRequired({
          value: password,
          message: 'Mật khẩu không được bỏ trống',
        }),
      },
    }

    const isErrorField = validateFields(errorFields)

    if (isErrorField) {
      return json({errorFields})
    }

    return await login({
      username,
      password,
    })
  } catch (error) {
    console.log(error)
  }
}

export default function Login() {
  const transition = useTransition()
  const data = useActionData()
  const errorFields = get(data, 'errorFields')

  const errors = errorFields && getErrorField(get(data, 'errorFields'))

  const errorUsername = get(errors, 'username')
  const errorPassword = get(errors, 'password')

  return (
    <AuthLayout>
      <Form
        method="post"
        className="grid gap-6 w-96"
        autoComplete="off"
        autoCorrect="off"
      >
        <h2 className="text-center text-4xl mb-6 font-bold font-serif">
          Đăng nhập
        </h2>

        <FormField label="Số điện thoại / Email" required error={errorUsername}>
          <Input
            name="username"
            placeholder="Điền số điện thoại hoặc Email"
            block
            error={!!errorUsername}
            inputSize="lg"
          />
        </FormField>
        <div>
          <FormField label="Mật khẩu" required error={errorPassword}>
            <Input
              type="password"
              name="password"
              placeholder="Điền mật khẩu"
              block
              error={!!errorPassword}
              inputSize="lg"
            />
          </FormField>

          <div className="flex justify-between my-2">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm">Ghi nhớ đăng nhập</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm hover:text-orange-600"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        <Button
          loading={!!transition.submission}
          type="submit"
          size="lg"
          variant="contained"
          color="primary"
        >
          Đăng nhập
        </Button>
        <div className="text-center border-t border-slate-200 pt-4 mt-4">
          <p>
            Bạn chưa có tài khoản?
            <Link
              to="/signup"
              className="text-orange-600 hover:text-orange-400 ml-2"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </Form>
    </AuthLayout>
  )
}
