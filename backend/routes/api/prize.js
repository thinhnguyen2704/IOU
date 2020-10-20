const express = require('express');
const router = express.Router();
const Prize = require('../../models/Prize')

router.post('/add', (req, res) => {

    const newPrize = new Prize({
        prize: req.body.prize
    })
    
    newPrize.save()

    res.send(newPrize)
})

router.get('/', (req, res) => {
    Prize.find().then(prize_list => {
        return res.status(200).json(prize_list)
    })
})

module.exports = router;