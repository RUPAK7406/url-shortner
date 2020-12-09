const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    url: {type: String},
    urlHash: {type: String,},
    shortUrl : {type : String}
},{versionKey:false});

module.exports = mongoose.model('Url', UrlSchema);