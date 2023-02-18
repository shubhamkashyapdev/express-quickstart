import express from 'express'
import { createDevice, getAllDevices } from '../controllers/DeviceController'
import validator from '../middlewares/resourceValidator'
import DeviceSchema from '../schemas/DeviceSchema'

const DeviceRouter = express.Router()

DeviceRouter.route('/').get(getAllDevices)
DeviceRouter.route('/').post(validator(DeviceSchema), createDevice)

export default DeviceRouter
