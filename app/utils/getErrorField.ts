interface GetErrorField {
  [key: string]: string
}

export function getErrorField<TObj>(errorFields: TObj): GetErrorField {
  let errorObj: GetErrorField = {}

  Object.keys(errorFields).forEach((key: string) => {
    const errorFieldKey = Object.keys(errorFields[key])

    if (errorFieldKey.length > 0) {
      errorObj[key] = errorFields[key][errorFieldKey[0]]
    }
  })

  return errorObj
}
