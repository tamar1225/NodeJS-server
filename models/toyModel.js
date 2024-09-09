const mongoose = require("mongoose");

const toySchema = mongoose.Schema({
    name: { type: String, require: true, minLength: 3 },
    prodDate: { type: Date, default: new Date().getDate() },
    numberOfPlayers: { type: Number, require: true, min: 1 },
    ageOfPlayers: { type: String },
    price: { type: Number },
    company: { type: String, match: /^(?=.*[a-zA-Z].*[a-zA-Z])[\w\d]+$/ },
    goals: { type: [String] },
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'category'}
});

module.exports = mongoose.model('toy', toySchema);