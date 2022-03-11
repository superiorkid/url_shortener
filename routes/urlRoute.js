const express = require('express')

const urlController = require('../controllers/urlController')

const router = express.Router()


router.get('/', urlController.getAllData)
// router.get('/:url', urlController.get_url_by_name)
router.post('/', urlController.shorting)


module.exports = router
