const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const textfield = {
    type: String,
    required: [true, "This field cannot be empty"]
}
const parentInfo = Schema({
    pname: textfield,
    pemail:{
        type: String,
        required: [true, "This field cannot be empty"],
        
    },
    pphone: textfield,
    address: textfield
});
const student = Schema({
    name: textfield,
    email: {
        type: String,
        required: [true, "This field cannot be empty"],
        unique:true
        
    },
    gender: textfield,
    dob: textfield,
    school: textfield,
    sclass: textfield,
    parent: parentInfo
}, {timestamp: true});

module.exports = mongoose.model('student', student);