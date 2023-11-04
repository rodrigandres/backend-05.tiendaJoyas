const jewelServices = require('../services/jewelry.services.js')

const getAllJewels = (req, res) => {
  jewelServices.getAllJewels(req.query)
    .then((result) => res.status(result.success ? 200 : 500).json(result))
    .catch((error) => res.status(500).json({ success: false, message: error.message }))
}

const getJewelsByFilters = (req, res) => {
  jewelServices.getJewelsByFilters(req.query)
    .then((result) => res.status(result.success ? 200 : 500).json(result))
    .catch((error) => res.status(500).json({ success: false, message: error.message }))
}

const getJewelById = (req, res) => {
  jewelServices.getJewelById(req.params.id)
    .then((result) => res.status(result.success ? 200 : 500).json(result))
    .catch((error) => res.status(500).json({ success: false, message: error.message }))
}

module.exports = {
  getAllJewels,
  getJewelsByFilters,
  getJewelById
}
