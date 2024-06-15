import userModel from '../models/User.model.js'

const getSegmentDataAge = async (req, res) => {
  try {
    const ageCounts = await userModel.aggregate([
      { $group: { _id: '$Age', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])
    const totalUsers = ageCounts.reduce((sum, age) => sum + age.count, 0)

    const ageGroupPercentage = ageCounts.map(age => ({
      age: age._id,
      percentage: Math.round((age.count / totalUsers) * 100)
    }))

    return res.json({
      ageGroupPercentage
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getSegmentDataGender = async (req, res) => {
  try {
    const genderCounts = await userModel.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])
    const totalUsers = genderCounts.reduce(
      (sum, gender) => sum + gender.count,
      0
    )

    const genderGroupPercentage = genderCounts.map(gender => ({
      gender: gender._id,
      percentage: Math.round((gender.count / totalUsers) * 100)
    }))

    return res.json({
      genderGroupPercentage
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getSegmentDataPhoneBrand = async (req, res) => {
  try {
    const phoneBrandCounts = await userModel.aggregate([
      { $group: { _id: '$Brand Device', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])
    const totalUsers = phoneBrandCounts.reduce(
      (sum, phone) => sum + phone.count,
      0
    )

    const phoneBrandGroupPercentage = phoneBrandCounts.map(phone => ({
      brand: phone._id,
      count: phone.count,
      percentage: Math.round((phone.count / totalUsers) * 100)
    }))

    return res.json({
      phoneBrandGroupPercentage
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getSegmentDataDigitalInterest = async (req, res) => {
  try {
    const digitaInterestCounts = await userModel.aggregate([
      { $group: { _id: '$Digital Interest', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])
    const totalUsers = digitaInterestCounts.reduce(
      (sum, digitalInterest) => sum + digitalInterest.count,
      0
    )

    const digitaInterestGroupPercentage = digitaInterestCounts.map(
      digitalInterest => ({
        interest: digitalInterest._id,
        count: digitalInterest.count,
        percentage: Math.round((digitalInterest.count / totalUsers) * 100)
      })
    )

    return res.json({
      digitaInterestGroupPercentage
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export default {
  getSegmentDataAge,
  getSegmentDataGender,
  getSegmentDataPhoneBrand,
  getSegmentDataDigitalInterest
}
