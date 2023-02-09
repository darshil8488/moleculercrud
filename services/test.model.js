const  mongoose = require("mongoose");

const studentData =  mongoose.Schema({
    Fname:String,
    Lname:String,
    r_no: {type: Number},
})

module.exports  = studentData ;
