'use strict'
import models from '../../../connection/models/index'

async function getBrandsClient(req, res, next) {
  try {
   const id = req.params.id
   const data = await models.inoicesBrands.findAll({
    attributes:['id','idInvoice','idBrand','productQuantity','total'],
    where:{
      idInvoice:id
    },
    include:[{
      model:models.brands,
      attributes:['id','name','price','stock']
    }]
  })

  return res.status(200).send({data})
  } catch (error) {
    next(error)
  }
}
export {getBrandsClient}