const router=require('express').Router()

const {
    addTask,
    editTask,
    deleteTask,
    gettask,
    updateTaskStatus
}=require('../controller/taskctrl')
const { jwtverify } = require('../middleware/jwtverify')

router.get('/gettask',jwtverify,gettask)
router.post('/addtask',jwtverify,addTask)
router.put('/edittask',jwtverify,editTask)
router.delete('/deletetask/:taskId',jwtverify,deleteTask)
router.patch('/updatestatus/:taskId',jwtverify,updateTaskStatus)

module.exports=router

