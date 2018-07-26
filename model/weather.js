const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: String,
    comment: String
})

const weatherSchema = new Schema({
    name: String,
    icon: String,
    feelslike_c: Number,
    text: String,
    comments: [commentSchema]
});

module.exports = mongoose.model('weather', weatherSchema);