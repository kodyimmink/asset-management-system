const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    equipmentId: {type: String, trim: true},
    issue: {type: String, trim: true},
    created_at: {type: Date, required: true},
    created_by: {type: String, trim: true},
    closed_at: {type: Date},
    closed_by: {type: String, trim: true},
    status: {type: String},
    notes: [
            {
                note: {type: String, trim: true},
                created_at: {type: Date, required: true},
                created_by: {type: String, trim: true},
            }
    ]
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;