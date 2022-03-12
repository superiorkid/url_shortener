const express = require('express')

const urlController = require('../controllers/urlController')

const router = express.Router()

// rendering form
router.get('/add', urlController.submission)
router.post('/add', urlController.shorting)

router.get('/', urlController.getAllData)
router.get('/:code', urlController.get_data_byCode)
router.delete('/:code', urlController.delete_url)


module.exports = router
