import { Response } from 'express'

type HandleErrorType = {
  err: any
  res: Response
}

export const handleError = ({ err, res }: HandleErrorType) => {
  console.log({ err })
  // MONGODB DUPLICATE KEY ERROR
  if (err?.code === 11000) {
    const key = Object.keys(err?.keyPattern)[0]
    return res.status(500).json({
      STATUS_RESPONSE: 'FAILURE',
      STATUS_MESSAGE: `DUPLICATE KEY ${key}`,
      STATUS_DATA: err?.response?.data?.message || err?.message,
    })
  }
  res.status(500).json({
    STATUS_RESPONSE: 'FAILURE',
    STATUS_MESSAGE: 'INTERNAL SERVER ERROR',
    STATUS_DATA: err?.response?.data?.message || err?.message,
  })
}
