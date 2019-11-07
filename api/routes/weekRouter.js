
const express = require('express')
const router = express.Router()
var weekController = require('../controllers/weekController')

router.post('/search-week', weekController.search_week)
router.get('/weeks/:page/:limit', weekController.list_week)
router.get('/history/:id/:page/:limit', weekController.list_history)

module.exports = router