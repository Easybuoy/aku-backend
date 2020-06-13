const mongoose = require('mongoose');


const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    matric_no: {
        type: String,  
        // required: true,
        default: 0
    },
    surname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        // dropDups: true
    },
    phone:{
        type: String,
        required: true,
        unique: true,
        // dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    islecturer: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = User = mongoose.model('users', UserSchema);