const userSchema = require('../model/usermodel')
const { generateToken } = require('../config/jwttoken')
const bcrypt = require('bcrypt')



const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validateName = (name) => {
    const regex = /^[a-zA-Z]{2,50}$/;
    return regex.test(name);
};

const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9]{6,50}$/;
    return regex.test(password);
};

const register = async (req, resp) => {
    const { firstName, lastName, email, password } = req.body
    console.log(req.body)
    try {
        if (req.body) {
            const findUser = await userSchema.findOne(
                {
                    email: email
                }
            )
            if (findUser) {
                resp.status(200).json({ success: false, message: 'User Already Exists' })
            }
            else {
                const createUser = new userSchema({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
                console.log('create',createUser)
                if (createUser) {
                    await createUser.save()
                    const token = generateToken(createUser?._id)
                    resp.status(201).json({ success: true, message: 'User Created Success', user: createUser, token })
                }
            }
        }
    }
    catch (error) {
        console.log(error)
        resp.status(500).json({ success: false, message: 'Invaild Data Payload', error })
    }
}

const login = async (req, resp) => {
    const { email, password } = req.body
    try {
        if (req.body) {
            const findUser = await userSchema.findOne({
                email: email
            })
            if (findUser) {
                const validate = await bcrypt.compare(password, findUser?.password)
                if (validate === true) {
                    const token = generateToken(findUser?._id)
                    resp.status(200).json({ success: true, message: 'Login Success', user: findUser, token })
                }
                else {
                    resp.status(200).json({ success: false, message: 'Invalid Password' })
                }
            }
            else {
                resp.status(200).json({ success: false, message: 'User Not Found' })
            }
        }
    }
    catch (error) {

    }
}

const userDetails = async (req, resp) => {
    const user = req.user
    console.log(user);
    
    if (user) {
        resp.status(200).json({ success: true, message: 'User Fected', user })
    }
    else {
        resp.status(200).json({ success: false, message: 'User Not found' })
    }
}



module.exports = {
    register,
    login,
    userDetails
}