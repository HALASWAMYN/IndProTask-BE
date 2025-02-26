const taskSchema = require('../model/taskmodel')

const addTask = async (req, resp) => {
    const { title, description } = req.body
    const { _id } = req.user
    try {
        if (req.body) {
            if (req.user) {

                const createTask = new taskSchema({
                    author: _id,
                    title: title,
                    description: description
                })
                if (createTask) {
                    await createTask.save()
                    const taskDetails = await taskSchema.find({
                        author: _id
                    })
                    resp.status(201).json({ success: true, message: 'TaskAdded', task: taskDetails })
                }
                else {
                    resp.status(200).json({ success: false, message: 'Someting went wrong' })
                }
            }
            else {
                resp.status(200).json({ success: false, message: 'Invalid User Credentials' })
            }
        }
        else {
            resp.status(200).json({ success: false, message: 'Invalid Payload' })
        }
    }
    catch (error) {
        resp.status(500).json({ success: false, message: 'Internal Error', error })
    }
}

const editTask = async (req, resp) => {
    const { taskId, title, description } = req.body?.details
    const { _id } = req.user
    try {

        if (req.body) {
            if (req.user) {
                const findTask = await taskSchema.findByIdAndUpdate(
                    {
                        author: _id,
                        _id: taskId
                    },
                    {
                        $set: {
                            title: title,
                            description: description,
                        }
                    },
                    {
                        new: true
                    }
                )
                if (findTask) {
                    await findTask.save()
                    const taskDetails = await taskSchema.find({
                        author: _id
                    })
                    resp.status(201).json({ success: true, message: 'TaskAdded', task: taskDetails })
                }
                else {
                    resp.status(200).json({ success: false, message: 'Someting went wrong' })
                }
            }
            else {
                resp.status(200).json({ success: false, message: 'Invalid User Credentials' })
            }
        }
        else {
            resp.status(200).json({ success: false, message: 'Invalid Payload' })
        }
    }
    catch (error) {
        console.log('error', error)
        resp.status(500).json({ success: false, message: 'Internal Error', error })
    }
}



const deleteTask = async (req, resp) => {
    const { taskId } = req.params;
    const { _id } = req.user;

    console.log('task', taskId);

    try {
        if (_id) {
            const deleteTask = await taskSchema.findOneAndDelete(
                {
                    author: _id,
                    _id: taskId,
                }
            );

            if (deleteTask) {
                const taskDetails = await taskSchema.find({ author: _id });
                resp.status(201).json({ success: true, message: 'Task Deleted', task: taskDetails });
            } else {
                resp.status(200).json({ success: false, message: 'Task Not Found' });
            }
        } else {
            resp.status(200).json({ success: false, message: 'Invalid User Credentials' });
        }
    } catch (error) {
        console.log('error', error);
        resp.status(500).json({ success: false, message: 'Internal Error', error });
    }
};


// const updateTaskStatus=async(req,resp)=>{
//     const {taskId}=req.params;
//     const {_id}=req.user;
//     const {status}=req.body



// }

const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const userId = req.user._id;
        console.log("req.body",req.body)
        console.log('taskId',taskId)
   
        // Check if the task exists
        const task = await taskSchema.findOne({ _id: taskId, author: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update the task status
        task.status = status;
        await task.save();
        console.log('task',task)

        // Respond with the updated task
        const findTask=await taskSchema.find({
            author:userId
        })
        res.status(200).json({success:true,message:'status Changed',task:findTask});
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};





const gettask = async (req, resp) => {
    const { _id } = req.user

    const findTask = await taskSchema.find(
        {
            author: _id
        }
    )
    if (findTask) {
        resp.status(200).json({ success: true, message: 'Task Details Fected', task: findTask })
    }
    else {
        resp.status(200).json({ success: false, message: 'No Task found', task: [] })
    }

}




module.exports = {
    addTask,
    editTask,
    deleteTask,
    gettask,
    updateTaskStatus

}

