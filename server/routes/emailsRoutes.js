const router     = require('express').Router();
const controller = require('../controllers/emailsController.js')

router.post('/send_email', controller.send_email)

module.exports = router