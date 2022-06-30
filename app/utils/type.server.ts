export interface ErrorFields {
  [key: string]: string
}

export interface ResponseData {
  message?: string
  data?: any
  success: boolean
  errorFields: ErrorFields
}
