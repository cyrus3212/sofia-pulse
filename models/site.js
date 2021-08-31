const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const SiteSchema = new Schema({
    name: String,
    url: String
});

// Model
const Site = mongoose.model('Site', SiteSchema);

module.exports =  Site;