const express = require('express')

const urlController = require('../controllers/urlController')

const router = express.Router()


router.get('/', urlController.getAllData)
router.post('/', urlController.shorting)


module.exports = router
