const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    equipmentId: {type: String, trim: true},
    issueContent: {type: String, trim: true},
    issueCreatedAt: {type: Date, required: true},
    issueCreatedBy: {type: String, trim: true},
    issueClosedAt: {type: Date},
    issueClosedBy: {type: String, trim: true},
    issueStatus: {type: String},
    notes: [
            {
                note: {type: String, trim: true},
                noteCreatedAt: {type: Date, required: true},
                noteCreatedBy: {type: String, trim: true},
            }
    ]
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;