const express = require('express')

const urlController = require('../controllers/urlController')

const router = express.Router()


router.get('/', urlController.getAllData)
router.get('/:code', urlController.get_data_byCode)
router.post('/', urlController.shorting)
router.delete('/:code', urlController.delete_url)


module.exports = router
