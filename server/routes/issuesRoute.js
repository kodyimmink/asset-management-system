const router = require('express').Router();
let Issue = require('../models/issue.model');

//Find
router.route('/find/:id').get((req, res) => {
    Issue.find({ equipmentId: req.params.id })
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json('Error: ' + err));
})

//Create
router.route('/add').post((req, res) => {
    console.log(req.body)
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

module.exports = router;

