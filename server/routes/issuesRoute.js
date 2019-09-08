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
router.route('/notes/add/:id').post((req, res) => {
    Issue.findByIdAndUpdate(req.params.id,  {$push: {notes: {note: req.body.note, issueCreatedAt: req.body.issueCreatedAt, issueCreatedBy: req.body.issueCreatedBy}}})
    .then(() => res.json('Note added!'))
    .catch(err => res.status(400).json('Error: ' + err));
        
})

module.exports = router;




// //Add note
// router.route('/addNote/:id').post((req, res) => {
//     Equipment.findById(req.params.id)
//     .then(equipment => {
//         equipment.name = equipment.name;
//         equipment.equipmentType = equipment.equipmentType;
//         equipment.modelNumber = equipment.modelNumber;
//         equipment.serialNumber = equipment.serialNumber;
//         equipment.siteLocation = equipment.siteLocation;
//         equipment.specificLocation = equipment.specificLocation;

//         const newNote = {
//             note: req.body.newNote,
//             dateTime: dateTime = Date.parse(req.body.dateTime)
//         }
//         equipment.notes.push(newNote)
//         equipment.save()
//         .then(() => res.json('New Note Added!'))
//         .catch(err => console.error(err))
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// })

// //Read note
// router.route('/notes/:id').get((req, res) => {
//     Equipment.findById(req.params.id)
//     .then(equipment => res.json(equipment))
//     .catch(err => res.status(400).json('Error: ' + err));
// })

// //Delete note
// router.route('/notes/:parentId/:id').delete((req, res) => {
//     Equipment.findByIdAndUpdate(req.params.parentId, {$pull: {notes: {_id: req.params.id}}})
//     .then(() => res.json('Note deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// })