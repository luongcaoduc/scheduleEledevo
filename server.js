const express = require('express')
const APP = express()
const PORT = process.env.PORT || 8080
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/eledevoschedule', {useNewUrlParser: true}).then(() => {
  console.log("Connected MongoDB!!!")
}).catch(err => {
  console.log(err)
})

APP.use(bodyParser.json())
APP.use(bodyParser.urlencoded({extended: true}))
const routes = require('./api/routes/ScheduleRoutes')
routes(APP)
const weekRouter = require('./api/routes/weekRouter')
APP.use(weekRouter)

APP.use(function (req, res) {
  res.status(404).send({url: req.originalUrl + ' not found!'})
})

APP.listen(PORT, () => console.log("Server started on http:localhost:" + PORT))
