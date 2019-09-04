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
    const equipmentId = req.body.equipmentId;
    const issue = req.body.issue;
    const created_at = req.body.created_at;
    const created_by = req.body.created_by;
    const closed_at = req.body.closed_at;
    const closed_by = req.body.closed_by;
    const note = req.body.note;

    //issue here, right now not is being overwritten, need to push on array
    const newIssue = new Issue({
        equipmentId,
        issue,
        created_at,
        created_by,
        closed_at,
        closed_by,
        note
    })

    newIssue.save()
    .then(() => res.json('Issue added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}) 

module.exports = router;

