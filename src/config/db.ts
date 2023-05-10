import mongoose from 'mongoose'
import { MONGO_URI } from './credentials'

export const connectDB = async () => {
  try {
    console.log({ MONGO_URI })
    await mongoose.connect(MONGO_URI)
    console.log(`connected to mongodb`)
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error })
    }
  }
}
