const router = require('express').Router();
const verifyToken = require('./verifyToken');
let Issue = require('../models/issue.model');

//Find
router.get('/find/:id', verifyToken, (req, res) => {
    Issue.find({ equipmentId: req.params.id })
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json('Error: ' + err));
})

//Create
router.post('/add', verifyToken, (req, res) => {
    const newIssue = new Issue({
        equipmentId: req.body.equipmentId,
        issueContent: req.body.issueContent,
        issueCreatedAt: req.body.issueCreatedAt,
        issueCreatedBy: req.body.issueCreatedBy,
        issueClosedAt: req.body.issueClosedAt,
        issueClosedBy: req.body.issueClosedBy,
        issueStatus: req.body.issueStatus,
        notes:{
            note: req.body.noteContent,
            noteCreatedAt: req.body.noteCreatedAt,
            noteCreatedBy: req.body.noteCreatedBy
        }
    })

    newIssue.save()
    .then(() => res.json('Issue added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}) 

//newNote
router.post('/notes/add/:id', verifyToken, (req, res) => {
    Issue.findByIdAndUpdate(req.params.id,  {$push: {notes: {note: req.body.note, issueCreatedAt: req.body.issueCreatedAt, issueCreatedBy: req.body.issueCreatedBy}}})
    .then(() => res.json('Note added!'))
    .catch(err => res.status(400).json('Error: ' + err));
        
})

module.exports = router;