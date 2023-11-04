const { genericSqlQuery } = require('../dataAccess/pg.js')
const format = require('pg-format')

const getJewelById = async (id) => await genericSqlQuery('SELECT * FROM inventario WHERE id = $1;', [id])

const HATEOAS = (joyas, limit, order, page) => {
  const results = joyas.map((j) => ({
    name: j.nombre,
    href: `/joyas/joya/${j.id}`
  }))
  return {
    total: joyas.length,
    next: page < 2 ? `/joyas?limit=${limit}&order=${order}&page=${+page + 1}` : null,
    previous: page > 1 ? `/joyas?limit=${limit}&order=${order}&page=${page - 1}` : null,
    results
  }
}

const getAllJewels = async ({ limit = 6, page = 1, order = 'nombre_asc' }) => {
  const [campo, direccion] = order.split('_')
  const offSet = limit * (page - 1)
  const formatted = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limit, offSet)
  const joyas = await genericSqlQuery(formatted)
  return HATEOAS(joyas, limit, order, page)
}

const getJewelsByFilters = async ({ preciomax, preciomin, categoria, metal }) => {
  const filters = []
  const values = []
  let query = 'SELECT * FROM inventario '
  if (preciomax) filters.push(`precio <= $${values.push(preciomax)}`)
  if (preciomin) filters.push(`precio >= $${values.push(preciomin)}`)
  if (categoria) filters.push(`categoria = $${values.push(categoria)}`)
  if (metal) filters.push(`metal = $${values.push(metal)}`)
  if (filters.length > 0) query += `WHERE ${filters.join(' AND ')};`
  console.log(query)
  return await genericSqlQuery(query, values)
}

module.exports = {
  getJewelById,
  getAllJewels,
  getJewelsByFilters
}
