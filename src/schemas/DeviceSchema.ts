import { z } from 'zod'

const Device = z.object({
  deviceId: z.number(),
  deviceType: z.string(),
  deviceName: z.string(),
})

const DeviceSchema = z.object({
  body: Device,
})

export type DeviceType = z.infer<typeof Device>

export default DeviceSchema
