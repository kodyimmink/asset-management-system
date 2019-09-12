const router = require('express').Router();
let Equipment = require('../models/equipment.model');

router.route('/listAll').get((req, res) => {
    Equipment.find()
    .then(equipment => res.json(equipment))
    .catch(err => res.status(400).json('Error: ' + err));
})

//Create
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const equipmentType = req.body.equipmentType;
    const modelNumber = req.body.modelNumber;
    const serialNumber = req.body.serialNumber;
    const siteLocation = req.body.siteLocation;
    const siteId = req.body.siteId;
    const specificLocation = req.body.specificLocation;
    const notes = [];

    const newEquipment = new Equipment({
        name,
        equipmentType,
        modelNumber,
        serialNumber,
        siteLocation,
        siteId,
        specificLocation,
        notes
    })

    newEquipment.save()
    .then(() => res.json('Equipment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}) 

//Read
router.route('/:id').get((req, res) => {
    Equipment.findById(req.params.id)
    .then(equipment => res.json(equipment))
    .catch(err => res.status(400).json('Error: ' + err));
})

//Delete
router.route('/:id').delete((req, res) => {
    Equipment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Equipment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})


//Update
router.route('/update/:id').post((req, res) => {
    Equipment.findById(req.params.id)
    .then(equipment => {
        equipment.name = req.body.name,
        equipment.equipmentType = req.body.equipmentType,
        equipment.modelNumber = req.body.modelNumber,
        equipment.serialNumber = req.body.serialNumber,
        equipment.siteLocation = req.body.siteLocation,
        equipment.siteId = req.body.siteId,
        equipment.specificLocation = req.body.specificLocation

        equipment.save()
        .then(() => res.json('Equipment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


//Get all equipment and its details for a specific site
router.route('/getEquipmentDetails').post((req, res) => {
    console.log(req)
    Equipment.aggregate([ { $match: {siteId: req.body.siteId}}])
    .then(equipmentDetailsList => res.json(equipmentDetailsList))
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;