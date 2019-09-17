const router = require('express').Router();
const verifyToken = require('./verifyToken');
let Equipment = require('../models/equipment.model');


router.get('/listAll', verifyToken, (req, res) => {
    Equipment.find()
    .then(equipment => res.json(equipment))
    .catch(err => res.status(400).json('Error: ' + err));
})

//Create
router.post('/add', verifyToken, (req, res) => {
    const name = req.body.name;
    const equipmentType = req.body.equipmentType;
    const modelNumber = req.body.modelNumber;
    const serialNumber = req.body.serialNumber;
    const siteLocation = req.body.siteLocation;
    const siteId = req.body.siteId;
    const specificLocation = req.body.specificLocation;
    const gpsLat = req.body.gpsLat;
    const gpsLng = req.body.gpsLng;
    const notes = [];

    const newEquipment = new Equipment({
        name,
        equipmentType,
        modelNumber,
        serialNumber,
        siteLocation,
        siteId,
        specificLocation,
        gpsLat,
        gpsLng,
        notes
        
    })

    newEquipment.save()
    .then(() => res.json('Equipment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}) 

//Read
router.get('/:id', verifyToken, (req, res) => {
    Equipment.findById(req.params.id)
    .then(equipment => res.json(equipment))
    .catch(err => res.status(400).json('Error: ' + err));
})

//Delete
router.delete('/:id', verifyToken, (req, res) => {
    Equipment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Equipment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})


//Update
router.post('/update/:id', verifyToken, (req, res) => {
    Equipment.findById(req.params.id)
    .then(equipment => {
        equipment.name = req.body.name,
        equipment.equipmentType = req.body.equipmentType,
        equipment.modelNumber = req.body.modelNumber,
        equipment.serialNumber = req.body.serialNumber,
        equipment.siteLocation = req.body.siteLocation,
        equipment.siteId = req.body.siteId,
        equipment.specificLocation = req.body.specificLocation
        equipment.gpsLat = req.body.gpsLat,
        equipment.gpsLng = req.body.gpsLng

        equipment.save()
        .then(() => res.json('Equipment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


//Get all equipment and its details for a specific site
router.post('/getEquipmentDetails', verifyToken, (req, res) => {
    Equipment.aggregate([ { $match: {siteId: req.body.siteId}}])
    .then(equipmentDetailsList => res.json(equipmentDetailsList))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;