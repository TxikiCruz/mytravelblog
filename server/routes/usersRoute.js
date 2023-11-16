const router = require('express').Router()
const controller = require('../controllers/usersController')

router.get('/',controller.findAllUsers)
router.post('/register',controller.register)
router.post('/login',controller.login)
router.post('/verify_token',controller.verify_token)
router.post('/add', controller.addNewUser)
router.post('/delete', controller.deleteUser)
router.post('/update', controller.updateUser)

module.exports = router