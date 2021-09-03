const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item_schema = new Schema({
    school: {
        type:String,
        required: true,    
    },
    item: {
        type:String,
        required: true,    
    },
    amount: {
        type:String,
        required: true,    
    }
}, {timeStamp: true});

const item_model = mongoose.model('reg_item',item_schema);

module.exports = item_model;