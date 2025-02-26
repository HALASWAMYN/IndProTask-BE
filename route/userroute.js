const router=require('express').Router()
const {register,login,userDetails}=require('../controller/userctrl')
const { jwtverify } = require('../middleware/jwtverify')

router.get('/userDetails',jwtverify,userDetails)
router.post('/register',register)
router.post('/login',login)


module.exports=router