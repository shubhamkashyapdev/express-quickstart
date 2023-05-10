import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/credentials'
import { resGeneric } from '../utils/res-generic'

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenHeader = req.headers['authorization']
    if (!tokenHeader)
      return res.status(401).json({
        STATUS_MESSAGE: 'FAILURE',
        STATUS_RESPONSE: 'Access Denied',
      })
    const token = tokenHeader.split('Bearer')[1].trim()
    if (!token)
      return res.status(401).json({
        STATUS_MESSAGE: 'FAILURE',
        STATUS_RESPONSE: 'Access Denied',
      })

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    if (decoded) {
      req.user = decoded.id
      next()
    } else {
      const response = resGeneric({
        message: 'Invalid Token',
        status: 'FAILURE',
      })
      return res.status(400).json(response)
    }
  } catch (err) {
    res.status(401).json({
      STATUS_MESSAGE: 'FAILURE',
      STATUS_RESPONSE: 'Unauthorized',
    })
  }
}
