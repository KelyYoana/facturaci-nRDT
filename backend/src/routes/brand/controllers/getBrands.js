'use strict'
import models from '../../../connection/models/index'

async function getBrands(req,res,next){
  try {
    const getBrand = await getAllBrands()
    return res.status(200).send({getBrand})
  } catch (error) {
    next(error)
  }
}
export{getBrands}

async function getAllBrands(){
  return await models.brands.findAll({
    attributes: ['id','name','price','stock']
  })
}
