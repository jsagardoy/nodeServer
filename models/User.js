import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  roles: {
    type: [String],
    user: {
      type: Number,
      default: 3003
    },
    editor: Number,
    admin: Number
  },
  refreshToken: String
})

export default mongoose.model('User', userSchema)
