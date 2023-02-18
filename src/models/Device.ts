import mongoose, { Document } from 'mongoose'
import { DeviceType } from '../schemas/DeviceSchema'

type DeviceDocument = DeviceType & Document

const schema = new mongoose.Schema<DeviceDocument>({
  deviceId: {
    type: Number,
    required: [true, 'Device ID is required'],
    unique: [true, 'Device ID already exists'],
  },
  deviceType: {
    type: String,
    required: [true, 'Device Type is required'],
  },
  deviceName: {
    type: String,
    rquired: [true, 'Device Name is required'],
  },
})

const DeviceModel = mongoose.model('device', schema)
export default DeviceModel
