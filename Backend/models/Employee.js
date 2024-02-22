const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const EmployeeSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number},
    job_role : {type: String, required: true},
    numberOfDaysLoggedIn : {type: Number, required: true},
    totalDaysinTheMonth : {type: Number, required: true}
})

const EmployeeModel = model('Employee', EmployeeSchema)

module.exports = EmployeeModel;