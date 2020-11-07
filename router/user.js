const express = require("express");
const router = express.Router();
// const path = require('path');
const db = require('../index')


const userCtrl = require('../controller/user.controller')

router.post('/user',userCtrl.addUser)

router.post('/book', userCtrl.addUser)

router.get('/data', userCtrl.filterdata)

router.get('/alluser',userCtrl.allUser)

router.get('/all', userCtrl.findData)


module.exports = router
