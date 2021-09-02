const express = require('express');
const router = express.Router();
const Site = require('../models/site');


// Routes
router.get('/', (req, res) => {

    Site.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post('/save', (req, res) => {
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

// router.get('/name', (req, res) => {
//     const data =  {
//         username: 'peterson',
//         age: 5
//     };
//     res.json(data);
// });

module.exports = router;