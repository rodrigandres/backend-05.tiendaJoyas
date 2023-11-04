const express = require('express')
const router = express.Router()
const jewelryController = require('../controllers/jewelry.controller.js')

router.get('/joyas', jewelryController.getAllJewels)
router.get('/joyas/filtros', jewelryController.getJewelsByFilters)
router.get('/joyas/joya/:id', jewelryController.getJewelById)

module.exports = router
