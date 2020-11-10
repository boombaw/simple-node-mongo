const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true,
        min: 12
    },
    password : { 
        type: String,
        required: true
    },
    created_at : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema); 