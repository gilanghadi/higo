import userModel from '../models/User.model.js'

const getUniqueUsersPerDay = async (req, res) => {
  try {
    const offset = req.query.offset ? parseInt(req.query.offset) : 1
    const limit = req.query.limit ? parseInt(req.query.limit) : 5
    const aggregationPipline = [
      {
        $group: {
          _id: { date: '$Date', email: '$Email' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          uniqueUsers: { $addToSet: '$_id.email' },
          newUsers: { $sum: { $cond: [{ $eq: ['$count', 1] }, 1, 0] } },
          returningUsers: { $sum: { $cond: [{ $gt: ['$count', 1] }, 1, 0] } }
        }
      },
      {
        $project: {
          date: '$_id',
          uniqueUsersCount: { $size: '$uniqueUsers' },
          newUsers: 1,
          returningUsers: 1
        }
      }
    ]

    const getUniqueUsersPerDay = await userModel
      .aggregate(aggregationPipline)
      .skip(offset)
      .limit(limit)
    const totalData = (await userModel.aggregate(aggregationPipline)).length

    return res.json({
      getUniqueUsersPerDay,
      offset,
      limit,
      totalData
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getUniqueUsersOverall = async (req, res) => {
  try {
    const getUniqueUsersOverall = await userModel.distinct('Email').count()
    return res.json({ getUniqueUsersOverall })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getNewAndReturningOverall = async (req, res) => {
  try {
    const getNewAndReturningOverall = await userModel.aggregate([
      {
        $group: {
          _id: '$Email',
          firstAppearance: { $min: '$Date' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          newUsers: {
            $sum: { $cond: [{ $eq: ['$count', 1] }, 1, 0] }
          },
          returningUsers: {
            $sum: { $cond: [{ $gt: ['$count', 1] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          newUsers: 1,
          returningUsers: 1
        }
      }
    ])
    const { newUsers, returningUsers } = getNewAndReturningOverall[0]
    return res.json({ newUsers, returningUsers })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getBusiestDay = async (req, res) => {
  try {
    const getBusiestDay = await userModel.aggregate([
      {
        $group: {
          _id: '$Date',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ])
    return res.json({ getBusiestDay })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getBusiestHour = async (req, res) => {
  try {
    const getBusiestHour = await userModel.aggregate([
      {
        $group: {
          _id: '$Login Hour',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ])
    return res.json({ getBusiestHour })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getTotalData = async (req, res) => {
  try {
    const getTotalData = await userModel.countDocuments()
    return res.json({ getTotalData })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export default {
  getUniqueUsersPerDay,
  getUniqueUsersOverall,
  getNewAndReturningOverall,
  getBusiestDay,
  getBusiestHour,
  getTotalData
}
