import { NextFunction, Request, Response } from 'express'
import DeviceModel from '../models/Device'

export const getAllDevices = async (req: Request, res: Response) => {
  try {
    const devices = await DeviceModel.find({})
    res.status(200).json({
      success: true,
      data: devices,
    })
  } catch (err) {
    if (err instanceof Error) {
      console.log({ err })
    }
  }
}
