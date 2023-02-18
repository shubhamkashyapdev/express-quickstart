import mongoose, { Document } from 'mongoose'

type DeviceDocument = {
  deviceId: string
  type: string
} & Document

const schema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: [true, 'Device ID is required'],
  },
  deviceType: {
    type: String,
    required: [true, 'Type is required'],
  },
})

const DeviceModel = mongoose.model<DeviceDocument>('device', schema)
export default DeviceModel
