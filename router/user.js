const express = require("express");
const router = express.Router();
// const path = require('path');
const db = require('../index')


const userCtrl = require('../controller/user.controller')

router.post('/user',userCtrl.addUser)

router.post('/book', userCtrl.addUser)

router.post('/student', userCtrl.addStudent)

router.post('/update',userCtrl.updateStudent)

router.post('/bupdate', userCtrl.updateBulk);

router.post('/item', userCtrl.addItem)

router.post('/bremove', userCtrl.removeBulk)

router.get('/data', userCtrl.filterdata)

router.get('/alluser',userCtrl.allUser)

router.get('/all', userCtrl.findData)

router.get('/allstd',userCtrl.getstudent)

router.get('/allitem', userCtrl.itemdata)






module.exports = router
