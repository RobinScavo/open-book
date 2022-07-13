const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

// @desc Register new user
// @route POST /users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body

    if(!name || !password) {
        res.status(400)
        throw new Error('Please fill out all fields.')
    }

    // Check if user exists
    const userExists = await User.findOne({ name })

    if (userExists) {
        res.status(400)
        throw new Error('That user name is already in use.');
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

// @desc Authenticate user
// @route POST /users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
    const { name, password } = req.body

    // Check for user name
    const user = await User.findOne({name})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials.')
    }
})

// @desc Get user data
// @route GET /users/me
// @access Private
const getUser = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}



module.exports = {
    registerUser,
    loginUser,
    getUser
}
