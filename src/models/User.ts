import mongoose, { Document } from 'mongoose'
import { UserType } from '../schemas/user.schema'

type UserDocument = UserType & Document

const schema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  otp: String,
  resetToken: String,
})

const UserModel = mongoose.model('users', schema)
export default UserModel
