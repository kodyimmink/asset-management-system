const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const siteSchema = new Schema({
    siteLocation: {type: String, trim: true},
    siteStreetAddress: {type: String},
    siteState: {type: String},
    siteZipCode: {type: String},
    siteCountry: {type: String},
    gpsLat: {type: Number},
    gpsLng: {type: Number}
})

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;