const DEFAULT_MESSAGE = {
  REQUIRED: 'Vui lòng không để trống',
  MAX_VALUE: 'Giá trị quá lớn',
  MIN_VALUE: 'Giá trị quá nhỏ',
  MAX_LENGTH_VALUE: 'Giá trị quá dài',
  MIN_LENGTH_VALUE: 'Giá trị quá ngắn',
  PHONE_NOT_VALID: 'Số điện thoại không đúng định dạng',
  EMAIL_NOT_VALID: 'Email không đúng định dạng',
  NOT_SPACING: 'Giá trị có khoảng trắng',
}

type ValidateResponse = string | undefined

export function validateRequired({
  value,
  message,
}: {
  value: FormDataEntryValue
  message?: string
}): ValidateResponse {
  const messageError = message || DEFAULT_MESSAGE.REQUIRED
  if (!value || (typeof value === 'string' && !value.length))
    return messageError
}

interface IValidateLength {
  str: string
  value: number
  message?: string
  type: 'min' | 'max'
}

export function validateLength({
  str = '',
  value,
  message,
  type,
}: IValidateLength): ValidateResponse {
  const messageDefault =
    type === 'min'
      ? DEFAULT_MESSAGE.MIN_LENGTH_VALUE
      : DEFAULT_MESSAGE.MAX_LENGTH_VALUE
  const messageError = message || messageDefault

  if (type === 'min') {
    if (str.length < value) {
      return messageError
    }
    return
  }

  if (str.length > value) {
    return messageError
  }

  return
}

// phone
export function validatePhone(phone: string): ValidateResponse {
  const phoneRegex = /^[\+]?([0-9]{0,11})$/g

  if (phoneRegex.test(phone) === false) {
    return DEFAULT_MESSAGE.PHONE_NOT_VALID
  }
}

// email
export function validateEmail(email?: string): ValidateResponse {
  if (!email) {
    return
  }
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  if (!email.length || !validRegex.test(email)) {
    return DEFAULT_MESSAGE.EMAIL_NOT_VALID
  }
}

// is not spacing
export function validateSpacing({
  value,
  message,
}: {
  value: string
  message?: string
}) {
  const messageError = message || DEFAULT_MESSAGE.NOT_SPACING

  return value.trim().split(' ').length > 2 ? messageError : undefined
}

export function validateFields(errorFields: Object): boolean {
  const errorMap = Object.values(errorFields)
    .map(item => {
      return Object.values(item).some(Boolean)
    })
    .filter(item => item)

  return errorMap.length > 0
}
