'use strict'
import models from '../../../connection/models/index'

async function editBrand (req, res,next) {
  try {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const stock = req.body.stock
    
    const updateBrand = await models.brands.findOne({
      where: {id:id}
    })
    updateBrand.name=name
    updateBrand.price=price
    updateBrand.stock=stock
    updateBrand.updatedAt = new Date()
    await updateBrand.save()
    return res.status(200).send({message:'Producto editado'})
  } catch (error) {
   error.error=error
   error.message="Error al editar el registro"
   next()
  }
}

export{editBrand}