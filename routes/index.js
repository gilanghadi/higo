import express from 'express'
import SummaryController from '../controllers/SummaryController.js'
import SegmentController from '../controllers/SegmentController.js'
import UserController from '../controllers/UserController.js'

const router = express.Router()

// summary route
router.get(
  '/summary/unique-users-per-day',
  SummaryController.getUniqueUsersPerDay
)
router.get(
  '/summary/unique-users-overall',
  SummaryController.getUniqueUsersOverall
)
router.get(
  '/summary/new-returning-overall',
  SummaryController.getNewAndReturningOverall
)
router.get('/summary/busiest-day', SummaryController.getBusiestDay)
router.get('/summary/busiest-hour', SummaryController.getBusiestHour)
router.get('/summary/total-data', SummaryController.getTotalData)

// segment route
router.get('/segment/age', SegmentController.getSegmentDataAge)
router.get('/segment/gender', SegmentController.getSegmentDataGender)
router.get('/segment/phone-brand', SegmentController.getSegmentDataPhoneBrand)
router.get(
  '/segment/digital-interest',
  SegmentController.getSegmentDataDigitalInterest
)

// user route
router.get('/user/top-per-location', UserController.getUserDataTopPerLocation)
router.get('/user/location-type', UserController.getLocationType)
router.get('/user/:id', UserController.getUserDataDetail)

export default router
