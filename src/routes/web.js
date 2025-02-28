const express = require('express');
const router = express.Router();

router.get('/acc', (req, res) => {

    res.render('admin.ejs')
});
router.get('/login', (req, res) => {

    res.render('home.ejs')
});
module.exports = router