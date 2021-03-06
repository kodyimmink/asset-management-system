const router = require('express').Router();
const verifyToken = require('./verifyToken');
let Equipment = require('../models/equipment.model');

//Search by term
router.get('/:searchTerm', verifyToken, (req, res) => {
    const q = req.params.searchTerm
    Equipment.find({
       name: {
           $regex: new RegExp(q)
       }
    })
    .then(searchResults => res.json(searchResults))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
