const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
    name: {type: String, trim: true},
    equipmentType: {type: String, trim: true},
    modelNumber: {type: String, trim: true},
    serialNumber: {type: String, trim: true},
    siteLocation: {type: String, trim: true},
    siteId: {type: String},
    gpsLat: {type: Number},
    gpsLng: {type: Number},
    specificLocation: {type: String, trim: true}
})

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;