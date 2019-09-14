const router = require('express').Router();
let Site = require('../models/site.model');

//CRUD

//List All
router.route('/listAll').get((req, res) => {
    Site.find()
    .then(sites => res.json(sites))
    .catch(err => res.status(400).json('Error' + err))
})

//Create
router.route('/add').post((req, res) => {
    console.log(req.body)
    newSite = new Site({
        siteLocation: req.body.siteLocation,
        siteStreetAddress: req.body.siteStreetAddress,
        siteState: req.body.siteState,
        siteZipCode: req.body.siteZipCode,
        siteCountry: req.body.siteCountry,
        gpsLat: req.body.gpsLat,
        gpsLng: req.body.gpsLng
    })
    newSite.save()
    .then(() => res.json('Site added!'))
    .catch(err => res.status(400).json('Error' + err))
})

//Read
router.route('/:id').get((req, res) => {
    Site.findById(req.params.id)
    .then(site => res.json(site))
    .catch(err => res.status(400).json('Error' + err))
})

//Update
router.route('/update/:id').post((req, res) => {
    Site.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then(site => res.json(site))
    .catch(err => res.status(400).json('Error' + err))
})

//Delete
router.route('/:id').delete((req, res) => {
    Site.findByIdAndDelete(req.params.id)
    .then(() => res.json('Site deleted.'))
    .catch(err => res.status(400).json('Error' + err))
})

//Get site id by site name
router.route('/getId').post((req, res) => {
    Site.find( {siteLocation: req.body.siteLocation})
    .then(site => res.json(site))
    .catch(err => res.status(400).json('Error' + err))
})


module.exports = router;
