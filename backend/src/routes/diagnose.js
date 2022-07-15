const router = require('express').Router();

router.get('/', async(req, res) =>{
    res.send('Diagnose section!')
})
module.exports = router;
