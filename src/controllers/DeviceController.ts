import { NextFunction, Request, Response } from 'express'
import DeviceModel from '../models/Device'
import { socket } from '../index'
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
      res.status(500).json({
        success: false,
        error: err,
      })
    }
  }
}

export const createDevice = async (req: Request, res: Response) => {
  try {
    const newDevice = await DeviceModel.create(req.body)
    socket.emit('new-device', newDevice)
    res.status(200).json({
      success: true,
      data: newDevice,
    })
  } catch (err) {
    if (err instanceof Error) {
      console.log({ err })
      res.status(500).json({
        success: false,
        error: err,
      })
    }
  }
}
