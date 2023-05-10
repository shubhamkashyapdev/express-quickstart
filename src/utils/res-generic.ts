type ResGenericType = {
  status: 'FAILURE' | 'SUCCESS'
  message: string
  data?: any
}

export const resGeneric = ({ status, message, data = '' }: ResGenericType) => {
  return {
    STATUS_RESPONSE: status,
    STATUS_MESSAGE: message,
    STATUS_DATA: data,
  }
}
