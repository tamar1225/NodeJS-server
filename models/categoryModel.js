const mongoose = require("mongoose");

const categorySchema=mongoose.Schema({
    name: {type: String, require: true, minLength: 4},
    toys:[{
        type:mongoose.Schema.Types.ObjectId, ref:'toy'
    }]
});

module.exports = mongoose.model('category', categorySchema)