const express = require('express')
const router = express.Router()

const { shorting, get_all_url } = require('../controllers/urlController')


router.post('/', shorting)
router.get('/', get_all_url)


module.exports = router