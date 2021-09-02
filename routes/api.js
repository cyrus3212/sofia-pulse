const express = require('express');
const router = express.Router();
const Site = require('../models/site');
const { verifyAccessToken } = require('../helpers/jwt_helper');

// Routes
router.get('/', (req, res) => {

    Site.find({  })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {});
});

// Routes
router.get('/sites', verifyAccessToken, (req, res) => {

    Site.find({  })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
            console.log('error: ', error);
        });
});

router.post('/save', verifyAccessToken, (req, res) => {
    const data = req.body;

    const newSite = new Site(data);

    newSite.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // Site
        return res.json({
            msg: 'Your data has been saved!'
        });
    });
});


router.delete('/site/:id', (req, res) => {
    const id = req.params.id;

    Site.findByIdAndDelete(id).then((response) => {
        res.status(200).json({ msg: 'Successfully deleted Site.' });
    });
});

module.exports = router;