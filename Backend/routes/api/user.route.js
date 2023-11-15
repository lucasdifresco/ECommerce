var express = require('express')
var router = express.Router()
var Authorization = require('../../auth/authorization');
var UserController = require('../../controllers/users.controller');


// Get Users
router.get('/', Authorization, UserController.getUsers)
router.post('/userByMail', Authorization, UserController.getUsersByMail)

// Login and Registration
router.post('/registration', UserController.createUser)
router.post('/login', UserController.loginUser)

// Update and Delete Users
router.put('/', Authorization, UserController.updateUser)
router.delete('/:id', Authorization, UserController.removeUser)

// Export the Router
module.exports = router;