import userModel from '../models/User.model.js'

const getUserDataTopPerLocation = async (req, res) => {
  try {
    const locationType = req.query.locationType
      ? req.query.locationType
      : 'coastal'
    const offset = req.query.offset ? parseInt(req.query.offset) : 1
    const limit = req.query.limit ? parseInt(req.query.limit) : 5
    const topUsersPerLocationType = await userModel
      .find({ 'Location Type': locationType })
      .sort({ Date: 'descending' })
      .skip(offset)
      .limit(limit)
    const totalData = await userModel.countDocuments({
      'Location Type': locationType
    })
    return res.json({ topUsersPerLocationType, offset, limit, totalData })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getUserDataDetail = async (req, res) => {
  try {
    const { id } = req.params
    const users = await userModel.findById(id)
    return res.json({ users })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getLocationType = async (req, res) => {
  try {
    const locationType = await userModel.distinct('Location Type')
    return res.status(200).json({ locationType })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export default { getUserDataTopPerLocation, getUserDataDetail, getLocationType }
