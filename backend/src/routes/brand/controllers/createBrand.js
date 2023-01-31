'user strict'
import models from '../../../connection/models/index'

async function createBrand (req, res, next) {
 try {
  const creatBrand = await createNewBrand(req.body)
  return res.status(200).send({ message: 'OK'})
 } catch (error) {
  error.error=error
  error.message="Error al crear el producto"
  next(error)
 }
}

export{createBrand}

async function createNewBrand(body) {
  return await models.brands.create({
    name: body.name,
    price: body.price,
    stock: body.stock
  })
}
