import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  Number: Number,
  'Name of Location': String,
  Date: Date,
  'Login Hour': String,
  Name: String,
  Age: Number,
  gender: String,
  Email: String,
  'No Telp': String,
  'Brand Device': String,
  'Digital Interest': String,
  'Location Type': String
})

const userModel = mongoose.model('User', userSchema)
export default userModel
