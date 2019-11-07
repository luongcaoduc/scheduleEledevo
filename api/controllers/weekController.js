
const mongoose = require('mongoose')
const Calendars = mongoose.model('Calendars')
const Employees = mongoose.model('Employees')
const Weeks = mongoose.model('Weeks')
function convertToDay(date) {

    var convert = date.toLocaleDateString()
    return day = convert.split("/")[1] + "/" + convert.split("/")[0] + "/" + convert.split("/")[2]
}
// search ngày 30 tháng 8 thì input 30/8
exports.search_week = async (req, res) => {
    var page = parseInt(req.query.page)  || 1
    var limit = parseInt(req.query.limit) || 5
    const result = []
    
    
    try {
        const weeks = await Weeks.find()
        totalPage = Math.ceil(weeks.length/limit)
        
        for( let i = 0; i < weeks.length; i++) {
            if(convertToDay(weeks[i].start_date).indexOf(req.body.week) !== -1 || weeks[i].week === parseInt(req.body.week))
                result.push(weeks[i])
        }
         
        res.send({"weeks": result.slice((page - 1) * limit, (page - 1) * limit + limit), "totalPage": totalPage})
    } catch (e) {
        res.send(e)
    }
}

exports.list_week = async (req, res) => {
    var page = Number(req.param.page)
    var limit = Number(req.params.limit)
    var totalPage = 0
    try {
        const weeks = await Weeks.find().limit(limit).skip((page - 1)*2)
        const length = await Weeks.find().countDocuments()
        totalPage = Math.ceil(length/limit)
        
       
        res.send({weeks, "totalPage": totalPage})
    } catch (e) {
        res.send(e)
    }
}

exports.list_history = async (req, res) => {
    var page = Number(req.param.page)
    var limit = Number(req.params.limit)
        
        
        try {
            const calendars = await Calendars.find({week: req.params.id}).limit(limit).skip((page - 1)*2).populate({
                path: 'employee',
                select: 'name empid'
            }).populate({
                path: 'week',
                select: '_id week start_date end_date'
                
            }).exec()
            var totalPage = Math.ceil(calenders.length/limit)
            res.send({calendars, "totalPage": totalPage})
        } catch (e) {
            res.send(e)
        }
}
