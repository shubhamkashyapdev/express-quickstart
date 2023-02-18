import express from 'express'
import { getAllDevices } from '../controllers/DeviceController'

const DeviceRouter = express.Router()

DeviceRouter.route('/').get(getAllDevices)

export default DeviceRouter
